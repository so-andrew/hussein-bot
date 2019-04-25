const fs = require("fs");
let sayJSON = require("../data/sayings.json");
const Discord = require("discord.js");
//const config = require("../config.json");
let sayings = new Map();

module.exports = {
    name: 'say',
    description: "Quotes function",
    params: "Under construction",
    category: "fun",
    offensive: true,
    execute(message, args){
        fetchSayJSON();
        if(!args || !args.length){
            let sayDB = Array.from(sayings.values());
            let quote = sayDB[Math.floor(Math.random()*(sayDB.length))];
            const embed = new Discord.RichEmbed()
                .setTitle(`"${quote.text}"`);
            if(quote.name === "convert") embed.setTitle(`لَا إِلٰهَ إِلَّا ٱلله مُحَمَّدٌ رَسُولُ ٱلله`);
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
                else{
                    embed.setColor("BLUE");
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
            const embed = new Discord.RichEmbed();
            if(quote.text.length > 256) embed.setDescription(`"${quote.text}"`);
            else if(quote.name === "convert") embed.setTitle(`لَا إِلٰهَ إِلَّا ٱلله مُحَمَّدٌ رَسُولُ ٱلله`); 
            else embed.setTitle(`"${quote.text}"`);
            if(quote.text.length < 256){
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
                    if(message.mentions && message.author.id === process.env.OWNER_ID) embed.setDescription(`- ${message.mentions.users.first().username}`);
                    else embed.setDescription(`- ${message.author.username}`);
                }
                else{
                    embed.setDescription("- Anonymous");
                    embed.setColor("BLUE");
                }
            }
            else embed.setColor("BLUE");
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
