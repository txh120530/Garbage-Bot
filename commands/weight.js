const {MongoClient, ObjectID} = require('mongodb');
const utilities = require("../util/utilities.js");

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'garbage-users';

module.exports = {
	name: 'weight',
	description: 'Check Your Weight!',
	execute(message, args) {
		const userID = message.member.id;
		



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
			
			return message.channel.send(`<@${userID}> currently weighs ${user.weight} pounds!`);


	});
		});
}
}