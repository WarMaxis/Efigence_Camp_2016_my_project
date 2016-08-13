function sendPassword(pass) {
	$.ajax({
		type: "post",
		data: {
			login: "efi",
			password: pass
		},
		url: "https://efigence-camp.herokuapp.com/api/login",
		error: function (response) {
			console.log(response.responseText);
			var alertMessage = jQuery.parseJSON(response.responseText);
			$('.wrong-password').show();
			$('.alert-text').html(alertMessage.message);
		},
		success: function (response) {
			console.log("succes", response);
		}
	});
}

$(document).on('ready', function () {
	$('#clear-login').on('click', function () {

	});

	$('.main-button').on('click', function (event) {
		event.preventDefault();

		if ($('.login-number-input').length) {
			var login = $('.login-number-input').val();
			$('.login-number-tip, .login-number-input').hide();
			$('.login-number, .password-input').show();
			$('.user-photo').css('visibility', 'visible');
			$('.login-string').html(login);

		} else {
			var password = $('#password').val();
			if ($('#password').is(':visible')) {
				if (!password.length) {
					$('.wrong-password').show();
				} else {
					sendPassword(password);
				}
			}
		};
	});
});