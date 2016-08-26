//Take user input for action
var action = process.argv[2];

//User input for movie-this and spotify-this-song
var parameter = process.argv[3]
// .split(" ").join('+');

//Switch to determine action to take
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

//my-tweets
function twitter() {

	//Get twitter node package
	var twitter = require('twitter');

	//Grab the keys.js info
	var twitterKeys = require('./keys.js').twitterKeys;

	//Set client to the grabbed key
	var client = new twitter(twitterKeys);

	//Set screen_name and number of tweets to pull
	var params = {screen_name: '@seancapelle', count: 10};

	//Get timeline info
	client.get('statuses/user_timeline', params, function(error, tweets) {
	 	
	 	//If error occurs
	 	if (error) {
		    console.log('Error occurred: ' + error);
		    return;
		}
	 	
	 	//If no error
	 	if (!error) {
		
			//Display ten current tweets, numbered 1-10
			for (var i = 0; i < tweets.length; i++) {
				console.log((parseInt([i]) + 1) + '. ' + tweets[i].text);
			}    
		}
	});

}
//spotify-this-song
function spotify() {

	console.log("In Spotify");
	// console.log(parameter);

	//Get spotify node package
	var spotify = require('spotify');
	 
	spotify.search({ type: 'track', query: parameter}, function(error, data) {
	    //If error occurs
	    if (error) {
	        console.log('Error occurred: ' + error);
	        return;
	    }
	 	
	 	//If no error
		if (!error) {
			
			//Artist name 
			console.log(data.tracks.items[0].artists[0].name);
			//Album name
			console.log(data.tracks.items[0].album.name);
			
			console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
			console.log(data.tracks.items[0].album);

			// Artist(s)
			// The song's name
			// A preview link of the song from Spotify
			// The album that the song is from
			// if no song is provided then your program will default to

			// "The Sign" by Ace of Base

		}
	});

}
//movie-this
function movie() {

	console.log("In Movie");

	//Get request package
	var request = require('request');

	if(parameter == null) {
		
		var movieName = "Mr. Nobody";
	}
	else {

		var movieName = parameter;
	}

	console.log(movieName);

	//Create URL based on movieName
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';

	console.log(queryUrl);

	request(queryUrl, function (error, response, data) {

		//If error occurs
		 if (error) {
	        console.log('Error occurred: ' + error);
	        return;
	    }
		//If no error
		if (!error && response.statusCode == 200) {

			//Parse the data
			var grabData = JSON.parse(data);
			console.log(grabData.Title + " (" + grabData.Year + "), Rated: " + grabData.Rated + ". Filmed in: " + grabData.Country + ". Language: " + grabData.Language + 
				". Plot: " + grabData.Plot + " Starring: " + grabData.Actors + ". Rotten Tomatoes Rating: " + grabData.tomatoUserMeter + ", Rotten Tomatoes URL: " + grabData.tomatoURL);
		}
	});
//ADD + BETWEEN WORDS IN MOVIE TITLE!!!
}

//do-what-it-says
function doIt() {

	console.log("In doIt");

	var fs = require('fs');

	//Stores the contents of the reading inside the var "data"
	fs.readFile("random.txt", "utf8", function(error, data) {

	//Print the contents of data
	console.log(data);

	//TURN INTO ACTION

	})

}


//NOTES
//Use Case for the requests on step 5


// function movieThis(){
// 	var url = '';

// 	request(url, function(error, response, body)) {

// 		if(!error && response.statusCode == 200) {
// 			console.log("Movie");
// 			JSON.parse
// 		}
// 	}
// }

// INSTRUCTIONS:
// Level 1: Take any movie with a word title (ex: Cinderella) as a Node argument and retrieve the year it was created
// Level 2 (More Challenging): Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrive the year it was created. 
// ----------------------------------------------------------------------------------

// ... are the places where you need to code!

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// ...
