$(function() {
  $('#contacts').dataTable({
    "ajax": {
      "url":      "/contacts",
      "type":     "GET",
      "dataType": "json"
    },
    "initComplete": tableReady,
    "columns": [
      { "data": "id" },
      { "data": "first_name" },
      { "data": "last_name" },
      { "data": "email" },
      { "data": "phone_number" },
      { "data": "created_at" },
      { "data": null, "defaultContent": "<button class='btn btn-primary edit-button'>Edit</button>"}
    ]
  });

  function validateForm(data) {
    $(this).find('#contact-submit').button('loading')
    console.log('about to send with:' + data);
  };

  function handleErrors(thrownError) {
    console.log(thrownError.responseText);
    console.log(typeof thrownError.responseText);
    var errors=eval("("+thrownError.responseText+")");
    console.log(typeof errors);
    $.each(errors, function(key, value){
      input = $('#create-contact').find('#' + key);
      if (input) {
        var form_group = input.closest('.form-group');
        form_group.addClass('has-error');
        $("<span>").addClass('help-block').text("Error: " + value).appendTo(form_group);
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

  function tableReady() {
    $('.edit-button').on('click', editContact);
  };

  function editContact() {
    console.log('Editing!');
    table = $('#contacts').dataTable();
    data = table.fnGetData($(this).parents('tr')[0]);
    console.log(data);
    $('#edit-modal').modal('show');
  };
});
