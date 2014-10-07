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
    console.log('about to send with:' + data);
  };

  function handleErrors(xhr, thrownError) {
    console.log(xhr);
    console.log(thrownError);
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
