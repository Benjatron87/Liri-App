require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require("moment")

var command = process.argv[2];
var searched = process.argv.slice(3).join('+');

if(searched.length <= 0){
    searched = ''
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

    spotify.search({ type: 'track', query: searched }, function(err, data) {
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
else if(command === 'movie-this'){
    console.log('search movie ' + searched)
}
else if(command === 'do-what-it-says'){
    console.log('Woooo!!')
}
else{
    console.log('enter valid command!');
}


