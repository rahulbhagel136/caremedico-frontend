$(function() {


  $.validator.setDefaults({
    errorClass: 'help-block',
    highlight: function(element) {
      $(element)
        .closest('.form-group')
        .addClass('has-error');
    },
    unhighlight: function(element) {
      $(element)
        .closest('.form-group')
        .removeClass('has-error');
    },
    errorPlacement: function (error, element) {
      if (element.prop('type') === 'checkbox') {
        error.insertAfter(element.parent());
      } else if (element.prop('type') === 'text' || element.prop('type') === 'email' || element.prop('type') === 'password' ) {
        error.insertAfter(element.next());
      }
    }
  });

  $.validator.addMethod('strongPassword', function(value, element) {
    return this.optional(element) 
      || value.length >= 6
      && /\d/.test(value)
      && /[a-z]/i.test(value);
  }, 'Your password must be at least 6 characters long and contain at least one number and one letter.')

  $.validator.addMethod('mobileno', function(value, element) {
    return this.optional(element) 
      || /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(value);
  }, 'Please enter a valid mobile nimber.')

  $("#signupform").validate({
    rules: {
      email: {
        required: true,
        email: true,
        remote: {
          url: 'pages/available.php',
          type: 'post',
          dataType: 'text'
        }
      },
      password: {
        required: true,
        strongPassword: true
      },
      mob: {
        required: true,
        mobileno: true,
        remote: {
          url: 'pages/available.php',
          type: 'post',
          dataType: 'text'
        }
      },
      password1: {
        required: true,
        equalTo: '#password'
      },
      name: {
        required: true,
        lettersonly: true
      },
      acctype: {
        required: true
      },
      accept: {
        required: true
      }
    },
    messages: {
      email: {
        email: 'Please enter a valid email address',
        remote: 'This email already exist'
      },
      name: {
        lettersonly: 'Digits and special characters are not allowed'
      },
      mob: {
        remote: 'This Mobile already esist'
      }
    }
  });
});
