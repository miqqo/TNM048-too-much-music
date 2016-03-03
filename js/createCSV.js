//ONLY NEED TO DO THIS ONCE AND SAVE THE CSV FILE
function createCSV(artistSummary, result){
	console.log("i csv")
	var nrOfParameters = 4;
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

function createInfoCSV(artistSummary){
	console.log("artistSummary: " + artistSummary);
	

	var nrOfParameters = 4;
	var data = [];
	var dataSize = 0;

	
	
	for (var i = 0; i < artistSummary.length; i++)
		dataSize += artistSummary[i].length;
		
	// data.length = dataSize;

	for(var i = 0; i <= dataSize; i++)
	    data.push([]);



	for(var i = 0; i < artistSummary.length; i++){
		var nrOfSongs = artistSummary[i].length;
		if(i == 1){
			for(var j = 0; j < nrOfSongs; j++){		// going throug all the songs
				data[j].push(artistSummary[i][j][0].artist_name);
				data[j].push(artistSummary[i][j][0].title);
				data[j].push(artistSummary[i][j][0].audio_summary.acousticness)
				data[j].push(artistSummary[i][j][0].audio_summary.tempo)
				data[j].push(artistSummary[i][j][0].audio_summary.danceability)
				data[j].push(artistSummary[i][j][0].audio_summary.energy)
				data[j].push(artistSummary[i][j][0].audio_summary.instrumentalness)
				data[j].push(artistSummary[i][j][0].audio_summary.speechiness)
			}	
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
	link.setAttribute("download", "song-data.csv");
	link.click();
}
