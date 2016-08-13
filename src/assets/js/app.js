function emptyLogin() {
	$('.wrong-password').show();
	$('.alert').css('background-color', '#F08A24');
	$('.alert-text').html('Wprowadź swój login');

	$('.login-number-input').on('click', function () {
		$('.wrong-password').hide();
	});
}

function goToPassword() {
	var login = $('.login-number-input').val();

	$('.login-number-tip, .login-number-input').hide();
	$('.login-number, .password-input, .other-button').show();
	$('.user-photo').css('visibility', 'visible');

	$('.login-string').html(login);
}

function clearPassword() {
	$('.other-button').click();
}

function emptyPassword() {
	$('.wrong-password').show();
	$('.alert').css('background-color', '#F08A24');
	$('.alert-text').html('Wprowadź swoje hasło');

	$('#password').on('click', function () {
		$('.wrong-password').hide();
	});
}

function goodPassword() {
	location.href = 'index.html';
}

function sendPassword(log, pass) {
	$.ajax({
		type: "post",
		data: {
			login: log,
			password: pass
		},
		url: "https://efigence-camp.herokuapp.com/api/login",
		error: function (response) {
			console.log(response.responseText);
			var alertMessage = jQuery.parseJSON(response.responseText);

			$('.wrong-password').show();
			$('.alert').css('background-color', '#F04124');
			$('.alert-text').html(alertMessage.message);

			$('#password').on('click', function () {
				$('.wrong-password').hide();
			});
		},
		success: function (response) {
			console.log("succes", response);
			goodPassword();
		}
	});
}

$(document).on('ready', function () {
	$('#clear-login').on('click', function () {
		clearPassword();
	});

	$('.main-button').on('click', function (event) {
		event.preventDefault();

		if ($('.login-number-input').is(':visible')) {
			var login = $('.login-number-input').val();

			if (login == 0) {
				emptyLogin();
			} else {
				goToPassword();
			};

		} else {
			var login = $('.login-number-input').val();
			var password = $('#password').val();

			if (!password.length) {
				emptyPassword();
			} else {
				sendPassword(login, password);
			};
		};
	});
});