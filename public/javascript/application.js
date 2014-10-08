$(function() {
  $('#contacts').dataTable({
    "ajax": {
      "url":      "/contacts",
      "type":     "GET",
      "dataType": "json"
    },
    "initComplete": tableReady,
    "columns": [
      { "data": "first_name" },
      { "data": "last_name" },
      { "data": "email" },
      { "data": "phone_number" },
      { "data": "created_at" },
      { "data": null, "defaultContent": "<button class='btn btn-primary edit-button'>Edit</button>"},
      { "data": null, "defaultContent": "<button class='btn btn-danger delete-button'>Delete</button>"}
    ]
  });

  // Add listeners to buttons after table loads
  function tableReady() {
    $('.edit-button').on('click', editContact);
    $('.delete-button').on('click', deleteContact);
  };

  function validateForm(data) {
    $(this).find('#contact-submit').button('loading')
  };

  //Create Contact
  function handleErrors(thrownError) {
    var errors=eval("("+thrownError.responseText+")");
    $.each(errors, function(key, value){
      input = $('#create-contact').find('#' + key);
      if (input) {
        name = input.closest('.form-group').find('label').text();
        var form_group = input.closest('.form-group');
        form_group.addClass('has-error');
        $("<span>").addClass('help-block').text("Error: " + name + " " + value).appendTo(form_group);
      }
    });
  };

  function formSuccess() {
    window.location.reload(true);
  };

  $('#create-contact').on('submit', function(event){
    event.preventDefault();
    formData = $(this).serialize()
    $.ajax({
      type: 'post', url: '/contacts', data: formData,
      before: validateForm,
      success: formSuccess,
      error: handleErrors
    });
  });
  
  // Edit Contact
  function editContact() {
    table = $('#contacts').dataTable();
    data = table.fnGetData($(this).parents('tr')[0]);
    $('#edit-contact').find('#first_name').val(data.first_name);
    $('#edit-contact').find('#last_name').val(data.last_name);
    $('#edit-contact').find('#email').val(data.email);
    $('#edit-contact').find('#phone_number').val(data.phone_number);
    $('#edit-contact').find('#id').val(data.id);

    $('#edit-modal').modal('show');

    $('#edit-contact').on('submit', function(event){
      action = '/contacts/' + data.id
      event.preventDefault();
      formData = $(this).serialize()
      $.ajax({
        type: 'put', url: action, data: formData,
        before: validateForm,
        success: formSuccess,
        error: handleErrors
      });
    });
  };

  // Delete Contact
  function deleteContact() {
    table = $('#contacts').dataTable();
    data = table.fnGetData($(this).parents('tr')[0]);
    action = '/contacts/' + data.id
    $.ajax({
      type: 'delete', url: action, data: data, success: formSuccess
    });
  };
});
