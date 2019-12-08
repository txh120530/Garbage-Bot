module.exports = {
	name: 'annoylove',
	description: 'Sends some annoying love to a targeted User',
	execute(message, args) {
		
		const user = message.mentions.users.first();


		if (user) {
			const member = message.guild.member(user);

					const messages = [
					`Love ${member.toString()}!`,
					 `I love ${member.toString()}!`,
					 `${member.toString()} is Loved <3`,
					 `${member.toString()} is a very important person!`,
					 `${member.toString()} is special!`,
					 `People love ${member.toString()}`,
					 `*hugs ${member.toString()}*`,
					 `<3 <3 ${member.toString()} <3 <3`,
					 `I WUV YOOOUUUUU ${member.toString()}!!!`
					];
		const rand = messages[Math.floor(Math.random()*messages.length)];
		console.log(rand);
			if (member){
				message.channel.send(rand);
				list = [1000,2000,3000];
				for (var i = 0; i < 3; i++) {
					setTimeout(function(){ 
    					message.channel.send(rand);
 					}, list[i]);
				}
				
	
			}
		}

	},
};