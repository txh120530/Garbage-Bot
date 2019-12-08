const request = require('request');
const Fuse = require("fuse.js");
const _ = require("underscore")

const { itadkey } = require('./config.json');
const key = itadkey;



const itadSearch = function(search, callback){


	request(`https://api.isthereanydeal.com/v02/game/plain/?key=${key}&title=${search}`, function (error, response, body) {

	if(_.isEmpty(body[0]) || _.isEmpty(JSON.parse(body).data) ){
		callback('Search came up empty, please try a different search term', undefined);
	} else {
		const results = {
      		plain: JSON.parse(body).data.plain
    	}
    	callback(undefined, results);
	}
  


  
});
}

const itadPrices = function(search, name, callback){
	request(`https://api.isthereanydeal.com/v01/game/prices/?key=${key}&plains=${search}&country=US`, function(error, response, body){
		if(_.isEmpty(body[0]) || _.isEmpty(JSON.parse(body).data) ){
			callback('Search came up empty, please try a different search term', undefined);
		} else {

			const data = JSON.parse(body).data[search].list;

			let message = `Current lowest prices for ${name} \n`;
			for (var key in data) {
    			message = message + `Store: ${data[key].shop.name}, Current Price $${data[key].price_new}, Original Price: $${data[key].price_old} \n`;
			}
			console.log(message);
			callback(undefined, message);
		}
	});
}




module.exports = 
{itadSearch, itadPrices};