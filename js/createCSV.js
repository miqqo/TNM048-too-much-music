//ONLY NEED TO DO THIS ONCE AND SAVE THE CSV FILE
function createCSV(artistSummary, result){
	console.log("i csv")
	var nrOfParameters = 3;
	var data = [];

	for (var i = 0; i <= artistSummary.length; i++)
	    data.push([]);

	for(var i = 0; i <= artistSummary.length; i++){
		for(var j = 0; j <= nrOfParameters; j++){
			data[i].push(result[j][i]);
		}
	}

	//put data into csv-file
	var csvContent = "data:text/csv;charset=utf-8,";
	data.forEach(function(infoArray, index){

	   dataString = infoArray.join(",");
	   csvContent += index < data.length ? dataString+ "\n" : dataString;

	});

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "artist-data.csv");
	link.click();
}
