const Discord = require("discord.js");

exports.run = (client, message) => {
    console.log("Command !%s received from %s", "about", message.author.username);
    const embed = new Discord.RichEmbed()
        .setTitle("**Hussein Bot**")
        .setDescription("\"Hi I live here\"\n\nCreated by <@197598081867448320> using the Discord.js JavaScript library (Now with 200% more JavaScript)\n\nCredit to <@231973798436536322> for the idea and basic logic structure")
        .addField("Current Version", "2.2.0");
    message.channel.send({embed: embed});
};