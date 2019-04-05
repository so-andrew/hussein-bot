const fs = require("fs");
let sayJSON = require("../data/sayings.json");
const Discord = require("discord.js");
const config = require("../config.json");
let sayings = new Map();

module.exports = {
    name: 'say',
    description: "Quotes function",
    execute(message, args){
        fetchSayJSON();
        if(!args || !args.length){
            let sayDB = Array.from(sayings.values());
            let quote = sayDB[Math.floor(Math.random()*(sayDB.length))];
            const embed = new Discord.RichEmbed()
                .setTitle(`"${quote.text}"`);
            if(quote.hasOwnProperty("author")){
                embed.setDescription(`- ${quote.author}`);
                if(quote.author === "Tyler"){
                    embed.setColor("GREEN");
                }
                else if(quote.author === "Hussein"){
                    embed.setColor("DARK_RED");
                }
                else if(quote.author === "Hassan"){
                    embed.setColor("DARK_BLUE");
                }
            }
            else if(quote.name === "convert"){
                embed.setDescription(`- ${message.author.username}`);
            }
            else{
                embed.setDescription("- Anonymous");
            }
            message.channel.send({embed: embed});
        }
        else{
            let quote = sayings.get(args[0]);
            const embed = new Discord.RichEmbed()
                .setTitle(`"${quote.text}"`);
            if(quote.hasOwnProperty("author")){
                embed.setDescription(`- ${quote.author}`);
                if(quote.author === "Tyler"){
                    embed.setColor("GREEN");
                }
                else if(quote.author === "Hussein"){
                    embed.setColor("DARK_RED");
                }
                else if(quote.author === "Hassan"){
                    embed.setColor("DARK_BLUE");
                }
                else if(quote.author === "Sarinda"){
                    embed.setColor("DARK_GREEN");
                }
            }
            else if(quote.name === "convert"){
              if(message.mentions && message.author.id === config.ownerID) embed.setDescription(`- ${message.mentions.members.first().user.username}`);
              else embed.setDescription(`- ${message.author.username}`);
            }
            else{
                embed.setDescription("- Anonymous");
            }
            message.channel.send({embed: embed});
        }
    }
}

function fetchSayJSON(){
    sayings = new Map();
    for(let key in sayJSON){
        sayings.set(key, sayJSON[key]);
    }
}
