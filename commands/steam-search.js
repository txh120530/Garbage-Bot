
const steam = require("../util/steam.js");


module.exports = {
  name: 'steam-search',
  description: 'Search for steam game ID by name',
  args: true,
  execute(message, args) {
    if (!args.length) {
    return message.channel.send(`Please provide a game name, ${message.author}!`);
    }
  else{
    let searchTerm = (args.join(' '));
    steam.steamIDSearch(searchTerm, function(error, results = {}){
      if(error){
        return message.channel.send("Error: " + error.message);
      }else {
      message.channel.send("Game name: " + results.name + " Game ID: " + results.appid);
    }
    });
    
  }
}
};