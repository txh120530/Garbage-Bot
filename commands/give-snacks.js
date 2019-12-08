const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'garbage-users';

module.exports = {
	name: 'give-snacks',
	description: 'Give snacks to a target User',
	execute(message, args) {
		const userID = message.mentions.users.first().id;
		var snackNumber = parseInt(args[1], 10);
		

	if (snackNumber === null || isNaN(snackNumber) || snackNumber == '' || snackNumber <= 0 || snackNumber > 50){
		return message.channel.send("Please enter a valid number (1 - 50) of how many snacks to give.")
	} else {
		snackNumber = Math.floor(Number(snackNumber));
		console.log('Snack number: ', snackNumber);
	}

	if (userID === message.member.user.id){
		return message.channel.send("Can't give snacks to yourself you greedy cat!");
	}

	MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
		if (error) {
			return console.log('Unable to connect to database');
		}

		const db = client.db(databaseName);


			db.collection('garbage-users').findOneAndUpdate(
			{userName: userID},
			{	$inc: {snacks: snackNumber}},
			{returnOriginal: false, upsert: true},
			 (error, user) =>{
			if (error){
				return console.log('Unable to fetch');
			}

			if (user === null){
				return message.channel.send('User not found, make sure they are registered before they can get snackies!');
			}
			console.log(user);
			return message.channel.send(`Gave <@${userID}> ${snackNumber} snacks! They currently have ${user.value.snacks} snacks!`);
	});
		});

}
}