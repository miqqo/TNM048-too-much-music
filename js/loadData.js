// API-key: GKC2LETMWJQDKAC0H 
function loadData(){

	var data;
	//country = country.toLowerCase();
	var country = "france";
	var artistSummary = [];
	console.log("i loadData: " + country)
	getArtist(country);

	function getArtist(country){
		var url_location = 'http://developer.echonest.com/api/v4/artist/search?api_key=GKC2LETMWJQDKAC0H&format=json&artist_location=country:'+country+'&bucket=artist_location&results=5';

		$.getJSON(url_location, function(json) {
		    data = json; 

		    for(var i = 0; i < json.response.artists.length; i++){
		    	getArtistData(data.response.artists[i].id, i)
		    }
		});	
	}

	//get the song data from each artist
	function getArtistData(artist_id, artist_nr){
		
		var url_artist = 'http://developer.echonest.com/api/v4/artist/songs?api_key=GKC2LETMWJQDKAC0H&id='+artist_id+'&format=json&start=0&results=5';

		var req = $.getJSON(url_artist, function(json) {
		    getAudioSummary(json.response.songs, artist_nr);  
		});

	}


	// hämtar all info om artistens alla sånger och lägger det i audioSummary
	function getAudioSummary(data, artist_nr){

		var audioSummary = [];
		// console.log(data)
		for(var i = 0; i < data.length; i++){
			var url = 'http://developer.echonest.com/api/v4/song/profile?api_key=GKC2LETMWJQDKAC0H&id='+data[i].id+'&bucket=audio_summary';

			var req = $.getJSON(url, function(json) {
			    audioSummary.push(json.response.songs);
			});

		}
		// The request is done, and we can do something else
		req.success(function(response){
		    artistSummary.push(audioSummary);

		    if(artistSummary.length == 10){
		    	dataHandler.computeAverageParameters(artistSummary, audioSummary);
		    	createInfoCSV(artistSummary);
		  
		    }
		    	
		});
		
	}

}

