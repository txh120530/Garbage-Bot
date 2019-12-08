const request = require('request');
const Fuse = require("fuse.js");
const _ = require("underscore")

const { itadKey } = require('../config.json');
const key = itadKey;



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
			console.log(`https://api.isthereanydeal.com/v01/game/prices/?key=${key}&plains=${search}&country=US`);

			const data = JSON.parse(body).data[search].list;

			let intro = `Current deals for ${name} \n`;
			var message = '';
			for (var key in data) {
				if (!(data[key].price_new === data[key].price_old)){
    			message = message + `${data[key].shop.name}: $${data[key].price_new} / <${data[key].url}>  \n`;
    			}
			}
			console.log(message);
			if (!message == ''){
				message = intro + message;
				callback(undefined, message);
			} else {
				callback(undefined, `There are currently no deals for ${name}`);
			}
			
		}
	});
}




module.exports = 
{itadSearch, itadPrices};