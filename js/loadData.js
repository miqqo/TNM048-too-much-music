
function loadData(){
	var http = new XMLHttpRequest();
	var url = "http://developer.echonest.com/api/v4/artist/hotttnesss?api_key=XOYOJOABJ8Z4GQDXZ&name=lady+gaga&format=json";
	var jsonData;
	
	$.getJSON(url, function(data) {
		jsonData = data;
	});
}


