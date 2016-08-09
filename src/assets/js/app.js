$('#clear-login').click(function () {
	$('.login-number-input').css('display', 'inline-block');
	$('.user-photo').css('display', 'none');
	$('#clear-login').css('display', 'none');
	$('.login-number').css('display', 'none');
	$('.login-space').css('margin-top', '134px');
	$('.login-space').css('padding-bottom', '60px');
	$('.password-input').css('display', 'none');
	$('.main-button').css('display', 'block').css('margin', '0 auto');
	$('.other-button').css('display', 'none');
	$('.login-number-tip').css('display', 'block');
});

if ($('.login-number').css('display') === 'none') {
	$('#.main-button').click(function () {
		location.reload();
	});
}