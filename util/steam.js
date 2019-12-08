const request = require('request');
const Fuse = require("fuse.js");
const _ = require("underscore");

const { steamKey } = require('../config.json');

const steamIDSearch = function(search, callback){
	request('http://api.steampowered.com/ISteamApps/GetAppList/v0002', function (error, response, body) {
  
  const gameList = (JSON.parse(body).applist.apps);
  const results = steamID(gameList, search);


  if (results instanceof Error){
      console.log("Error Message " + results);
      return callback(results, undefined);
  } else {
      callback(undefined, results);
  }
 


  
});
}

const steamID = function (gameList, searchTerm) {
var options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name"
  ]
};


    var fuse = new Fuse(gameList, options)
	var result = fuse.search(searchTerm);

	if(_.isEmpty(result[0]) || !result[0].appid ){
    return new Error("Results came up empty. Please try a different search term."); 
	} else{
    const results = {
      name: result[0].name,
      appid: result[0].appid
    }
		return results;
	}
 	

};

module.exports.steamIDSearch = steamIDSearch;