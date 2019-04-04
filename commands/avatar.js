const Discord = require("discord.js");

exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "clean", message.author.username);
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
