function getData(endpoint, callback) {
	$.ajax({
		type: "get",
		url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
		success: function (response) {
			callback(response);
		}
	});
}

getData("data/summary", function (dataPrint) {
	$('.balance').html(dataPrint.content[0].balance);
	$('.funds').html(dataPrint.content[0].funds);
	$('.payments').html(dataPrint.content[0].payments);
});

getData("data/history", function (dataPrint) {
	var historyLength = dataPrint.content.length;

	for (i = 0; i < historyLength; i++) {
		$('.history-date').html(dataPrint.content[i].date);
		$('.history-title').html(dataPrint.content[i].description);
		$('.history-funds').html(dataPrint.content[i].amount);
	}
});