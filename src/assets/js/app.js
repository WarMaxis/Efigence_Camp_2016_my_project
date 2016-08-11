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
		$('.login-number, .password-input, .wrong-password').hide();
		$('.user-photo').fadeTo(0, 0);
		$('.login-number-input, .login-number-tip').show();
	});

	$('.main-button').on('click', function (event) {
		event.preventDefault();
		var password = $('#password').val();
		if ($('#password').is(':visible')) {
			if (!password.length) {
				$('.wrong-password').show();
			} else {
				sendPassword(password);
			}
		}
	});
});