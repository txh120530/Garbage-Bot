module.exports = {
	name: 'love',
	description: 'Sends some love to a target user',
	execute(message, args) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member){
				message.channel.send(`${member.toString()} is loved. <3`);
	
			}
		}

	},
};