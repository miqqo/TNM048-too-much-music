function dataHandler(){
	var sumEnergy, sumDanceability, sumSpeechiness, artists;
	

	//Beräknar summan av de valda parametrarna för varje artist
	this.computeAverageParameters = function(artistSummary, audioSummary){

		//får 5 artister, 2 låtar var
		//summerar alla artisters låtar per parameter
		artists = [];
		artists.push("Artist");
		for(var i = 0; i < artistSummary.length; i++){
			artists.push(artistSummary[i][0][0].artist_name);
		}


		sumEnergy = computeEnergy(artistSummary, audioSummary);
		sumDanceability = computeDanceability(artistSummary, audioSummary);
		sumSpeechiness = computeSpeechiness(artistSummary, audioSummary);

		console.log("sumEnergy: " + sumEnergy);
		console.log("sumDanceability: " + sumDanceability);
		console.log("sumSpeechiness: " + sumSpeechiness);


		var result = [];
		result = getParameters();

		// createCSV(artistSummary, result);

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
		paramArray.push(artists);
		paramArray.push(sumEnergy);
		paramArray.push(sumDanceability);
		paramArray.push(sumSpeechiness);
		console.log(paramArray);
		return paramArray;
	}

}