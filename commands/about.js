const Discord = require("discord.js");

module.exports = {
    name: 'about',
    description: "About message for Hussein Bot.",
    category: "utility",
    cooldown: 5,
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        const embed = new Discord.RichEmbed()
            .setTitle("**Hussein Bot** - \"Hi I live here\"")
            .setDescription("Created by <@197598081867448320> using the Discord.js JavaScript library\n\nCredit to <@231973798436536322> for the idea and basic logic structure")
            .attachFiles(["./resources/hussein.png"])
            .setThumbnail("attachment://hussein.png")
            .setColor("BLUE")
            .addField("Current Version", "3.1.0", true)
            .addField("GitHub Repository", "https://github.com/so-andrew/hussein-bot/", true);
        message.channel.send({embed: embed});
    }
}
