module.exports = {
	name: 'annoy',
	description: 'Sends some annoyance to a targeted User',
	execute(message, args) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member){
				message.channel.send(`Hey ${member.toString()}!`);
				list = [1000,2000,3000];
				for (var i = 0; i < 3; i++) {
					setTimeout(function(){ 
    					message.channel.send(`Hey ${member.toString()}!`);
 					}, list[i]);
				}
				
	
			}
		}

	},
};