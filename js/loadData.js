// API-key: GKC2LETMWJQDKAC0H 
function loadData(){

	var data;
	var country = "sweden";
	var artistSummary = [];
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

	// räknar ut det totala värdet av en parameter för totalt x låtar
	// ev hämtar ut all info om artistens låtar och lägger in en array som vi kan använda sen
	function getArtistData(artist_id, artist_nr){
		
		var url_artist = 'http://developer.echonest.com/api/v4/artist/songs?api_key=GKC2LETMWJQDKAC0H&id='+artist_id+'&format=json&start=0&results=2';

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

		    if(artistSummary.length == 5){
		    	console.log("helt färdig")
		    	dataHandler.computeAverageParameters(artistSummary, audioSummary);
		  
		    }
		    	
		});
		
	}

}

