require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
const fs = require("fs");

var command = process.argv[2];
var searched = process.argv.slice(3).join('+');

if(searched.length <= 0){
    searched = ''
}

if(command === 'do-what-it-says'){

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
    
        var random = data.split(",");

        command = random[0];
        searched = random[1];

        console.log(command, searched);
    
    })
}

if(command === 'concert-this'){

    axios.get("https://rest.bandsintown.com/artists/" + searched + "/events?app_id=codingbootcamp")
    .then(function(response) {

    for(let i = 0; i < response.data.length; i++){

        let venue = response.data[i].venue.name;
        let loc = response.data[i].venue.country;
        let date = response.data[i].datetime;

        date = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    
        console.log(' Venue: ' + venue + '\n', 'Location: ' + loc + '\n', 'Date: ' + date + '\n')
    }
  })
}

else if(command === 'spotify-this-song'){

    if(searched === ''){

        searched = 'Ace+of+Base'
    }

    spotifySearch(searched);

}
else if(command === 'movie-this'){

    axios.get("http://www.omdbapi.com/?t=" + searched + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {

        let title = response.data.Title
        let year = response.data.Year
        let imdbRating = response.data.Ratings[0].Value
        let rtRating = response.data.Ratings[1].Value
        let country = response.data.Country
        let lang = response.data.Language
        let plot = response.data.Plot
        let actors = response.data.Actors

        console.log(' Title: ' + title + '\n', 'Plot: ' + plot + '\n', 'Actors: ' + actors + '\n', 'Year: ' + year + '\n', 'IMDB Rating: ' + imdbRating + '\n', 'Rotten Tomatoes: ' + rtRating + '\n' + ' Country: ' + country + '\n', 'Language: ' + lang + '\n');
        }
    );
}
else if(command === 'do-what-it-says'){

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
    
        var random = data.split(",");

        searched = random[1];

        spotifySearch(searched)
    
    })
}

else{
    console.log('enter valid command!');
}

var spotifySearch = function(item){

    spotify.search({ type: 'track', query: item }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }

        for(let i = 0; i < 5; i++){
            let artist = data.tracks.items[i].artists[0].name; 
            let song = data.tracks.items[i].name; 
            let link = data.tracks.items[i].external_urls.spotify; 
            let album = data.tracks.items[i].album.name;
            
            console.log(' Artist: ' + artist + '\n', 'Title: ' + song + '\n', 'Sample: ' + link + '\n', 'Album: ' + album + '\n');
        }
    })
}