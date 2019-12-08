const request = require('request');
const itad = require("../util/itad.js");




module.exports = {
  name: 'prices',
  description: 'Find current prices for a game',
  args: true,
  execute(message, args) {
    if (!args.length) {
    return message.channel.send(`Please provide a game name, ${message.author}!`);
    }
  else{
    let searchTerm = (args.join(' '));
    itad.itadSearch(searchTerm, function(error, results = {}){
      if(error){
        return message.channel.send("Error: " + error);
      }else {

      itad.itadPrices(results.plain, searchTerm, function(error, results ={}){
        return message.channel.send(results);
      });
    }
    });
    
  }
}
};