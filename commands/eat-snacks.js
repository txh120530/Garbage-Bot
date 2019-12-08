const {MongoClient, ObjectID} = require('mongodb');
const utilities = require("../util/utilities.js");

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'garbage-users';

module.exports = {
	name: 'eat-snacks',
	description: 'Eat Snacks',
	execute(message, args) {
		const userID = message.member.id;
		var snackNumber = parseInt(args[0], 10);
		

	if (snackNumber === null || isNaN(snackNumber) || snackNumber == '' || snackNumber <= 0 ){
		return message.channel.send("Please enter a valid number of snacks to eat.")
	} else {
		snackNumber = Math.floor(Number(snackNumber));
	}


	MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
		if (error) {
			return console.log('Unable to connect to database');
		}
const db = client.db(databaseName);

			db.collection('garbage-users').findOne(
			{userName: userID},
			 (error, user) =>{
			if (error){
				return console.log('Unable to fetch');
			}

			if (user === null){
				return message.channel.send('User not found, make sure they are registered!');
			}
			var oldWeight = 0;

			if (user.weight == null){
				oldWeight = 90;
			} else {
				oldWeight = user.weight;
			}
			if (snackNumber > user.snacks){
				snackNumber = user.snacks;
			}

			console.log("Old Weight: " + oldWeight);



			db.collection('garbage-users').findOneAndUpdate(

			{userName: userID},
			{	$inc: {snacks: - snackNumber}, $set: {weight: (oldWeight + utilities.snacksToWeight(snackNumber)) }},
			{returnOriginal: false, upsert: true},
			 (error, user) =>{
			if (error){
				return console.log('Unable to fetch');
			}

			if (user === null){
				return message.channel.send('User not found, make sure they are registered!');
			}
			console.log ("New Weight: " + user.value.weight);
			return message.channel.send(`<@${userID}> ate ${snackNumber} snacks! They currently have ${user.value.snacks} snacks and weigh ${user.value.weight} pounds!`);
	});


	});
		});
}
}