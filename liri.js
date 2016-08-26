// ACCEPT UNTRUSTED CERTIFICATES
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

//TAKE USER INPUT FOR ACTION
var action = process.argv[2];

//USER INPUT FOR MOVIE-THIS AND SPOTIFITY-THIS-SONG
var parameter = process.argv[3]

//SWITCH TO DETERMINE ACTION TO TAKE
function doAction(action) {
    switch(action) {
        case 'my-tweets':
            twitter();
            break;
        case 'spotify-this-song':
            spotify();
            break;
        case 'movie-this':
            movie();
            break;
        case 'do-what-it-says':
            doIt();
            break;
        default:
            console.log("Enter 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'");
    }
}

//MY-TWEETS FUNCTIONALITY
function twitter() {

	//GET TWITTER NODE PACKAGE
	var twitter = require('twitter');

	//UTILIZE KEY.JS INFORMATION
	var twitterKeys = require('./keys.js').twitterKeys;

	//SET CLIENT TO THE GRABBED KEY
	var client = new twitter(twitterKeys);

	//SET SCREEN NAME AND NUMBER OF TWEETS TO PULL 
	var params = {screen_name: '@Sendego', count: 20};

	//GET TIMELINE INFO
	client.get('statuses/user_timeline', params, function(error, tweets) {
	 	
	 	//IF AN ERROR HAPPENS...
	 	if (error) {

	 		// RETURN THE FOLLOWING
		    console.log('Error occurred: ' + error);
		    return;
		}
	 	
	 	//IF NO ERROR
	 	if (!error) {
		
			//DISPLAY 20 CURRENT TWEETS, NUMBER 1-20
			for (var i = 0; i < tweets.length; i++) {
				console.log((parseInt([i]) + 1) + '. ' + tweets[i].created_at + ' - ' + tweets[i].text);
			}    
		}
	});

}
//SPOTIFY FUNCTIONALITY
function spotify() {

	console.log("In Spotify");

	//RETRIEVE SPOTIFY NODE PACKAGE
	var spotify = require('spotify');
	 
	spotify.search({ type: 'track', query: parameter || 'ace of base the sign'}, function(error, data) {

	    //IF ERROR OCCURS
	    if (error) {

	    	// RETURN THE FOLLOWING
	        console.log('Error occurred: ' + error);
	        return;
	    }
	 	
	 	//IF NO ERROR
		if (!error) {
            
            // RETURN THE FOLLOWING INFORMATION
            info = {
                artists: data.tracks.items[0].artists.map(function (val) { return val.name; }).join(', '),
                songName: data.tracks.items[0].name,
                previewUrl: data.tracks.items[0].preview_url,
                album: data.tracks.items[0].album.name
            }
            

			console.log('Artist(s): ' + info.artists);
			console.log('Album: ' + info.album);			
			console.log('Name: ' + info.songName);
			console.log('Preview URL: ' + info.previewUrl);

		}
	});

}
//MOVIE FUNCTIONALITY
function movie() {

	console.log("In Movie");

	//GET MOVIE PACKAGE
	var request = require('request');

	if(parameter == null) {
		
		var movieName = "Mr. Nobody";
	}
	else {

		var movieName = parameter;
	}

	console.log(movieName);

	//CREATE URL BASED ON MOVIE NAME
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';

	console.log(queryUrl);

	request(queryUrl, function (error, response, data) {

		//IF ERROR OCCURS 
		 if (error) {

		 	// RETURN THE FOLLOWING
	        console.log('Error occurred: ' + error);
	        return;
	    }
		//IF NO ERROR
		if (!error && response.statusCode == 200) {

			//PARSE THE DATA AND RETURN THE FOLLOWING CONSOLE.LOG
			var grabData = JSON.parse(data);
			console.log(grabData.Title + " (" + grabData.Year + "), Rated: " + grabData.Rated + ". Filmed in: " + grabData.Country + ". Language: " + grabData.Language + 
				". Plot: " + grabData.Plot + " Starring: " + grabData.Actors + ". Rotten Tomatoes Rating: " + grabData.tomatoUserMeter + ", Rotten Tomatoes URL: " + grabData.tomatoURL);
		}
	});
}

//DO WHAT IT SAYS FUNCTIONALITY
function doIt() {

	console.log("In doIt");

	var fs = require('fs');

	//STORES THE CONTENTS OF THE READING INSIDE THE VAR "DATA" 
	fs.readFile("random.txt", "utf8", function(error, data) {        
        var split = data.split(',')
        
        action = split[0];
        parameter = split[1];
        
        doAction(action);
	});
}


doAction(action);