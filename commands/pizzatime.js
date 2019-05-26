const presence = require("../commands/presence.js");
const Discord = require('discord.js');

module.exports = {
		name: 'pizzatime',
		description: "Joins the current voice channel and plays the Pizza Theme from Spider-Man 2.",
		params: "User must be in a voice channel",
		category: "novelty",
		guildOnly: true,
		cooldown: 10,
		async execute(message, args){
				console.log(`Command ${module.exports.name} received from ${message.author.username}`);
				if(message.member.voiceChannel){
						try{
								const connection = await message.member.voiceChannel.join();
								message.channel.send("**PIZZA TIME**");
                const embed = new Discord.RichEmbed()
                  .setImage('https://cdn.discordapp.com/attachments/231599783255605248/336404762587037696/unknown.png')
                  .setColor([167,24,20]);
                message.channel.send({embed: embed})
								message.client.user.setPresence({ status:'online', game: {name: 'PIZZA TIME'}});
								const dispatcher = connection.playFile('./resources/pizzatheme.mp3');
								if(parseInt(args[0]) === 0){
										dispatcher.setVolume(0);
								}
								else dispatcher.setVolume(0.15);
								dispatcher.on('end', async () => {
										try{
												const connection = await message.client.voiceConnections.get(message.guild.id);
												setTimeout(()=>{
													connection.disconnect();
													presence.setPresence(message.client);
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
		}
}
