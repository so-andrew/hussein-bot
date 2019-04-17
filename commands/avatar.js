const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    description: "Returns the avatar of the mentioned user, or if no one is mentioned, returns the avatar of the invoking user.",
    category: "utility",
    params: "`@mention` (optional)",
    cooldown: 3,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        const embed = new Discord.RichEmbed();
        if(!args || !args.length){
            embed.setImage(message.author.avatarURL)
            if(message.channel.type === "dm") embed.setColor(3447003);
            else embed.setColor(message.member.displayHexColor);
        }
        else{
            embed.setImage(message.mentions.users.first().avatarURL)
            if(message.channel.type === "dm") embed.setColor(3447003);
            else embed.setColor(message.mentions.members.first().displayHexColor);
        }
        message.channel.send({embed: embed});
    }
}
