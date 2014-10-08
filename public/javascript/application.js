$(function() {
  $('#contacts').dataTable({
    "ajax": {
      "url":      "/contacts",
      "type":     "GET",
      "dataType": "json"
    },
    "columns": [
            { "data": "id" },
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "email" },
            { "data": "phone_number" },
            { "data": "created_at" }
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
      input = $('#' + key);
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
});
