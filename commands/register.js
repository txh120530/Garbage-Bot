const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'garbage-users';

module.exports = {
	name: 'register',
	description: 'Register Username to the Database (no other info will be added)',
	execute(message, args) {
		const userID = message.member.id;
		console.log(userID);

	MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
		if (error) {
			return console.log('Unable to connect to database');
		}

		const db = client.db(databaseName);

		// Read
		function userExists(user, callback){
			db.collection('garbage-users').findOne({userName: userID}, (error, user) =>{
				if (error){
					return console.log(error);
				}

				if (user === null){
					return callback(undefined, false);
				} else {
					return callback(`<@${userID}> already exists! They currently have ${user.snacks} snacks!`);
				}
		});
		}

		userExists(userID, function(error, results){
			if (error){
				
				return message.channel.send(error);
			}

		// Create
	db.collection('garbage-users').insertOne({
		userName: userID,
		snacks: 0
	}, (error, response) => {
		if (error) {
			return message.channel.send(error);
		}	

		
		return message.channel.send(`<@${userID}> has been Added to the Database! They currently have ${response.ops[0].snacks} snacks!`);
		});
});

});
}
}