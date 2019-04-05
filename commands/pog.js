const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'pog',
    description: "Function to add to the pog jar.",
    async execute(message, args){
        let output;
        if(args == 2 || args == 3){
            output = ["pog"];
        }
        else{
            let pogRegex = /(p{1}\s*o*\s*g{1})/ig;
            output = message.content.match(pogRegex);
        }
        let pluralString = "";
        if(message.client.pogjar.has(message.author.id)){
            message.client.pogjar.set(message.author.id, message.client.pogjar.get(message.author.id) + output.length);
            pluralString = "s";
        }
        else{
            message.client.pogjar.set(message.author.id, 1);
        }
        const embed = new Discord.RichEmbed()
            .setTitle("Pog Jar")
            .setDescription("You have invested " + message.client.pogjar.get(message.author.id) + " pog" + pluralString + " into the pog jar!")
            .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
            .setColor("#0fc13c");
        message.channel.send({embed:embed});
        fs.writeFile("./data/pogjar.json", JSON.stringify(Array.from(message.client.pogjar.entries())), function(err){
            if(err) throw err;
        });
        console.log("Pog jar updated.");
    }
}
