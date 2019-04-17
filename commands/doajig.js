const Discord = require('discord.js');

module.exports = {
    name: 'doajig',
    description: "Hussein Bot reaffirms his servitude to you with a little jig and a potentially offensive picture.",
    category: "novelty",
    offensive: true,
    cooldown: 5,
    execute(message){
      console.log(`Command ${module.exports.name} received from ${message.author.username}`);
      message.channel.send('Yes masta\n\n');
      const embed = new Discord.RichEmbed()
          .setImage('http://africaamericanculturalnarratives.weebly.com/uploads/2/5/0/4/25046162/6179333_orig.jpg')
          .setColor([102, 51, 0]);
      message.channel.send({embed: embed})
    }
}
