// Brak wprowadzenia loginu
function emptyLogin() {
	$('.wrong-password').show();
	$('.alert').css('background-color', '#F08A24');
	$('.alert-text').html('Wprowadź swój login');

	$('.login-number-input').on('click', function () {
		$('.wrong-password').hide();
	});
}

// Użytkownik wprowadził login
function goToPassword() {
	var login = $('.login-number-input').val();

	$('.login-number-tip, .login-number-input').hide();
	$('.login-number, .password-input, .other-button').show();
	$('.user-photo').css('visibility', 'visible');

	$('.login-string').html(login);
}

// Usunięcie wpisanego loginu
function clearLogin() {
	$('.other-button').click();
}

// Brak wprowadzenia hasła
function emptyPassword() {
	$('.wrong-password').show();
	$('.alert').css('background-color', '#F08A24');
	$('.alert-text').html('Wprowadź swoje hasło');

	$('#password').on('click', function () {
		$('.wrong-password').hide();
	});
}

// Wysłanie loginu i hasła poprzez AJAX
function sendData(log, pass) {
	$.ajax({
		type: "post",
		data: {
			login: log,
			password: pass
		},
		url: "https://efigence-camp.herokuapp.com/api/login",
		error: function (response) {
			console.log(response.responseText);

			// Pobranie wiadomości o błędzie z API
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

			// Przekierowanie na stronę dashboardu
			location.href = 'dashboard.html';
		}
	});
}

$(document).on('ready', function () {

	// Dodanie obsługi pola input poprzez klawisz Enter
	$('.login-number-input, #password').keypress(function (e) {
		var key = e.which;
		if (key == 13) {
			$('.main-button').click();
			return false;
		}
	});

	// Wywołanie usunięcia wpisanego loginu
	$('#clear-login').on('click', function () {
		clearLogin();
	});

	// Event click na głównym buttonie
	$('.main-button').on('click', function (event) {
		event.preventDefault();

		// Walidacja wpisania loginu
		if ($('.login-number-input').is(':visible')) {
			var login = $('.login-number-input').val();

			if (login == 0) {
				emptyLogin();
			} else {
				goToPassword();

				if ($('.wrong-password').is(':visible')) {
					$('.wrong-password').hide();
				}

				// Auto focus na input
				$('#password').focus();
			};

			// Walidacja wpisania hasła i wywołanie AJAXa
		} else {
			var login = $('.login-number-input').val();
			var password = $('#password').val();

			if (!password.length) {
				emptyPassword();
			} else {
				sendData(login, password);
			};
		};
	});
});