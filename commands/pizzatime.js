const presence = require("../commands/presence.js");

exports.run = async (client, message, args) => {
		console.log("Command !%s received from %s", "pizzatime", message.author.username);
		if(message.member.voiceChannel){
			try{
				const connection = await message.member.voiceChannel.join();
				message.channel.send("**PIZZA TIME**\n\nhttps://cdn.discordapp.com/attachments/231599783255605248/336404762587037696/unknown.png");
				client.user.setPresence({ status:'online', game: {name: 'PIZZA TIME'}});
				const dispatcher = connection.playFile('./resources/pizzatheme.mp3');
				if(parseInt(args[0]) === 0){
						dispatcher.setVolume(0);
				}
				else dispatcher.setVolume(0.15);
				dispatcher.on('end', async () => {
						try{
								const connection = await client.voiceConnections.get(message.guild.id);
								setTimeout(()=>{
									connection.disconnect();
									presence.setPresence(client);
								}, 3000);
						}
						catch(err){
								console.log(err);
						}
				});
				dispatcher.on('error', err => {
						console.log(err);
				});
				}
				catch(err){
						console.error(err);
				}
		}
		else message.reply('join a voice channel first.');
};
