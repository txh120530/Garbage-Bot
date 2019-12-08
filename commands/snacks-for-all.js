const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'garbage-users';

module.exports = {
	name: 'snacks-for-all',
	description: 'Lets the room owner give snacks to everyone',
	execute(message, args) {
		var snackNumber = parseInt(args[0], 10);
		

	if (snackNumber === null || isNaN(snackNumber) || snackNumber == '' || snackNumber <= 0 || snackNumber > 50){
		return message.channel.send("Please enter a valid number (1 - 50) of how many snacks to give.")
	} else {
		snackNumber = Math.floor(Number(snackNumber));
		console.log('Snack number: ', snackNumber);
	}
	let allowedRole = message.guild.roles.get("name", "Admin");
	if (!message.member.permissions.has('BAN_MEMBERS') ){
		return message.channel.send("You must be the channel owner or a moderator to perform this command.");
	}

	MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
		if (error) {
			return console.log('Unable to connect to database');
		}

		const db = client.db(databaseName);


			db.collection('garbage-users').updateMany(
			{},
			{	$inc: {snacks: snackNumber}},
			{returnOriginal: false, upsert: true},
			 (error, user) =>{
			if (error){
				return console.log('Unable to fetch');
			}

			return message.channel.send(`Gave everyone ${snackNumber} snacks!`);
	});
		});

}
}