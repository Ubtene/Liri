var twitterKeys = require('./Key.js');

var spotify = require('spotify');

var fs = require("fs");

var client = twitterKeys.key;

var request = require('request');

var myArgs = process.argv.slice(3);

var thirdItem = process.argv[3];

var secondItem = process.argv[2];

if (secondItem === 'movie-this') {

    if (!thirdItem) {

        request('http://www.omdbapi.com/?t=Mr.%20Nobody%27', function(error, response, body) {


            if (!error && response.statusCode == 200) {

                // console.log(JSON.stringify(res, null, 2));

                var obj = JSON.parse(body);

                console.log(obj.Title); // Show the HTML for the Modulus homepage.
                console.log(obj.Year);
                console.log(obj.imdbRating);
                console.log(obj.Country);
                console.log(obj.Language);
                console.log(obj.Plot);
                console.log(obj.Actors);
                console.log(obj.Ratings[1]);
                console.log(obj.Website);
            }


        });

    } else {


        request('http://www.omdbapi.com/?t=' + thirdItem, function(error, response, body) {


            if (!error && response.statusCode == 200) {

                // console.log(JSON.stringify(res, null, 2));
                var obj = JSON.parse(body);

                console.log(obj.Title); // Show the HTML for the Modulus homepage.
                console.log(obj.Year);
                console.log(obj.imdbRating);
                console.log(obj.Country);
                console.log(obj.Language);
                console.log(obj.Plot);
                console.log(obj.Actors);
                console.log(obj.Ratings[1]);
                console.log(obj.Website);
            }


        });

    }

} 


if (secondItem === "my-tweets") {

    client.get('statuses/user_timeline', { include_entities: true, count: 20 },
        function(err, tweets, response) {
            if (err) {
                console.log(err.toString());
            } else {

                for (var i = 0; i < tweets.length; i++) {
                    console.log(JSON.stringify(tweets[i].text)),
                        // console.log(JSON.stringify(data[i].text, null, 2)); 
                        console.log('------------------------------------------')
                }

            }
        });

}


if (secondItem === "spotify-this-song") {

console.log(myArgs);

var string = myArgs.join(" ");

console.log(string);

spotify.search({ type: 'track', query: string }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name)
                     console.log(songInfo.name)
                     console.log(songInfo.album.name)
                     console.log(songInfo.preview_url)
    // console.log(songResult);
    };
  });

      }


if (secondItem === "do-what-it-says") {

fs.readFile('./random.txt', "utf8",  (err, data) => {
  if (err) throw err;
var read = data.split(",")

console.log(read[1]);

spotify.search({ type: 'track', query: read[1] }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name)
                     console.log(songInfo.name)
                     console.log(songInfo.album.name)
                     console.log(songInfo.preview_url)
    // console.log(songResult);
    };
  });




});

}