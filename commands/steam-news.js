const request = require('request');

const steam = require("../util/steam.js");

// var x = document.getElementsByTagName("a")[0].getAttribute("href"); 
//   var y = document.getElementsByTagName("a")[0].innerHTML; 

module.exports = {
  name: 'steam-news',
  description: 'Return the latest news for a steam game',
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
        request(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${results.appid}&count=1&maxlength=300&format=json`, function (error, response, body) {
          const latestNews = (JSON.parse(body)).appnews.newsitems[0];

                  const embed = {
    "title": latestNews.title,
    "description": latestNews.contents,
    "url": latestNews.url
}



        return message.channel.send(`Latest news update for ${results.name}`,{ embed});
        });
                
        


    }
    });
    
  }
}
};