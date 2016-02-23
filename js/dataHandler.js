function dataHandler(){

	//Beräknar summan av de valda parametrarna för varje artist
	this.computeAverageParameters = function(artistSummary, audioSummary){

		var sumEnergy = computeEnergy(artistSummary, audioSummary);
		var sumDanceability = computeDanceability(artistSummary, audioSummary);
		var sumSpeechiness = computeSpeechiness(artistSummary, audioSummary);

		console.log("sumEnergy: " + sumEnergy);
		console.log("sumDanceability: " + sumDanceability);
		console.log("sumSpeechiness: " + sumSpeechiness);

	}

	function computeEnergy(artistSummary, audioSummary){
		var sum = [];
		sum = Array.apply(null, Array(artistSummary.length)).map(Number.prototype.valueOf,0);

		for(var i = 0; i < artistSummary.length; i++){
			for(var j = 0; j < audioSummary.length; j++){
				sum[i] += artistSummary[i][j][0].audio_summary.energy;
			}
		}
		//console.log(sum);
		return sum;

	}

	function computeDanceability(artistSummary, audioSummary){
		var sum = [];
		sum = Array.apply(null, Array(artistSummary.length)).map(Number.prototype.valueOf,0);

		for(var i = 0; i < artistSummary.length; i++){
			for(var j = 0; j < audioSummary.length; j++){
				sum[i] += artistSummary[i][j][0].audio_summary.danceability;
			}
		}
		//console.log(sum);
		return sum;

	}

	function computeSpeechiness(artistSummary, audioSummary){
		var sum = [];
		sum = Array.apply(null, Array(artistSummary.length)).map(Number.prototype.valueOf,0);

		for(var i = 0; i < artistSummary.length; i++){
			for(var j = 0; j < audioSummary.length; j++){
				sum[i] += artistSummary[i][j][0].audio_summary.speechiness;
			}
		}
		//console.log(sum);
		return sum;

	}

}