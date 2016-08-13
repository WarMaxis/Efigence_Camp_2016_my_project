// Brak wprowadzenia loginu
function emptyLogin() {
	$('.wrong-password').slideDown(500);
	$('.alert').css('background-color', '#F08A24');
	$('.alert-text').html('Wprowadź swój login');

	$('.login-input').on('click', function () {
		$('.wrong-password').slideUp(500);
	});
}

// Użytkownik wprowadził login
function goToPassword() {
	var login = $('.login-input').val();

	$('.login-tip, .login-input').hide();
	$('.login, .password-input, .other-button').show();
	$('.user-photo').css('visibility', 'visible');

	$('.login-string').html(login);
}

// Usunięcie wpisanego loginu
function clearLogin() {
	$('.other-button').click();
}

// Brak wprowadzenia hasła
function emptyPassword() {
	$('.wrong-password').slideDown(500);
	$('.alert').css('background-color', '#F08A24');
	$('.alert-text').html('Wprowadź swoje hasło');

	$('#password').on('click', function () {
		$('.wrong-password').slideUp(500);
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

			$('.wrong-password').slideDown(500);
			$('.alert').css('background-color', '#F04124');
			$('.alert-text').html(alertMessage.message);

			$('#password').on('click', function () {
				$('.wrong-password').slideUp(500);
			});

			// Animacja Shake całego login-box
			$('.login-box').addClass('animate');
			setTimeout(function () {
				$('.login-box').removeClass('animate');
			}, 850);
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
	$('.login-input, #password').keypress(function (e) {
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
		if ($('.login-input').is(':visible')) {
			var login = $('.login-input').val();

			if (login == 0) {
				emptyLogin();
			} else {
				goToPassword();

				if ($('.wrong-password').is(':visible')) {
					$('.wrong-password').slideUp(500);
				}

				// Auto focus na input
				$('#password').focus();
			};

			// Walidacja wpisania hasła i wywołanie AJAXa
		} else {
			var login = $('.login-input').val();
			var password = $('#password').val();

			if (!password.length) {
				emptyPassword();
			} else {
				sendData(login, password);
			};
		};
	});
});