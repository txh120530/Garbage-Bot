const fs = require("fs");

module.exports = {
	name: 'help',
	description: 'List all Commands',
	execute(message, args) {


		    fs.readdir("./commands", (err, files) => {
        if(err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }

var namelist = "";
var desclist = "";
var usage = "";

let result = jsfiles.forEach((f, i) => {
    let props = require(`./${f}`);
    namelist = props.name;
    desclist = props.description;

    // send help text
    message.author.send(`**!${namelist}** \n${desclist} \n${usage}`);
});
    });


		message.channel.send('Sending commands to your DMs!');
	},
};