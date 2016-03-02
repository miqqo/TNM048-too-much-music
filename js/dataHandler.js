function dataHandler(){
	var sumEnergy, sumDanceability, sumSpeechiness;

	//Beräknar summan av de valda parametrarna för varje artist
	this.computeAverageParameters = function(artistSummary, audioSummary){

		//får 5 artister, 2 låtar var
		//summerar alla artisters låtar per parameter
		sumEnergy = computeEnergy(artistSummary, audioSummary);
		sumDanceability = computeDanceability(artistSummary, audioSummary);
		sumSpeechiness = computeSpeechiness(artistSummary, audioSummary);

		console.log("sumEnergy: " + sumEnergy);
		console.log("sumDanceability: " + sumDanceability);
		console.log("sumSpeechiness: " + sumSpeechiness);


		var result = [];
		result = getParameters();


		var otherArray = ["artist", "artist1", "artist2", "artist3", "artist4", "artist5"];

		var data = [];
		for (var i = 0; i < 6; i++)
            data.push([]);

        for(var i = 0; i < 6; i++){
        	data[i].push(otherArray[i]);
        }
        
		for(var i = 0; i < 6; i++){
			for(var j = 0; j < 3; j++){
				data[i].push(result[j][i]);
			}
		}
		//ONLY NEED TO DO THIS ONCE AND SAVE THE CSV FILE
		//put data into csv-file
	/*	var csvContent = "data:text/csv;charset=utf-8,";
		data.forEach(function(infoArray, index){

		   dataString = infoArray.join(",");
		   csvContent += index < data.length ? dataString+ "\n" : dataString;

		});

		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "data.csv");
		link.click();*/


		pc1.startDrawing();

	}

	function computeEnergy(artistSummary, audioSummary){
		var sum = [];
		sum = Array.apply(null, Array(artistSummary.length + 1)).map(Number.prototype.valueOf,0);

		//sum.push("energy");

		for(var i = 0; i < artistSummary.length; i++){
			for(var j = 0; j < audioSummary.length; j++){
				if(i == 0) sum[i] = "energy";
				sum[i+1] += artistSummary[i][j][0].audio_summary.energy;
			}
		}
		//console.log(sum);
		return sum;

	}

	function computeDanceability(artistSummary, audioSummary){
		var sum = [];
		sum = Array.apply(null, Array(artistSummary.length + 1)).map(Number.prototype.valueOf,0);

		for(var i = 0; i < artistSummary.length; i++){
			for(var j = 0; j < audioSummary.length; j++){
				if(i == 0) sum[i] = "danceability";
				sum[i+1] += artistSummary[i][j][0].audio_summary.danceability;
			}
		}
		//console.log(sum);
		return sum;

	}

	function computeSpeechiness(artistSummary, audioSummary){
		var sum = [];
		sum = Array.apply(null, Array(artistSummary.length + 1)).map(Number.prototype.valueOf,0);

		for(var i = 0; i < artistSummary.length; i++){
			for(var j = 0; j < audioSummary.length; j++){
				if(i == 0) sum[i] = "speechiness";
				sum[i+1] += artistSummary[i][j][0].audio_summary.speechiness;
			}
		}
		//console.log(sum);
		return sum;

	}

	function getParameters(){
		var paramArray = [];
		paramArray.push(sumEnergy);
		paramArray.push(sumDanceability);
		paramArray.push(sumSpeechiness);
		console.log(paramArray);
		return paramArray;
	}

}