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
		},
		success: function (response) {
			console.log("succes", response);
		}
	});
}

$(document).on('ready', function () {
	$('.main-button').on('click', function (event) {
		event.preventDefault();
		var password = $('#password').val();
		if (!password.length) {
			alert('Wpisz hasło!');
		} else {
			sendPassword(password);
		}
	});
});