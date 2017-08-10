const fs = require("fs");
let sayJSON = require("../sayings.json");
const Discord = require("discord.js");
let sayings = new Map();

exports.run = (client, message, args) => {
    fetchSayJSON();
    //console.log(args);
    if(!args){
        let saydb = Array.from(sayings.values());
        let quote = saydb[Math.floor(Math.random()*(saydb.length))];
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
        else{
            embed.setDescription("- Anonymous");
        }
        message.channel.send({embed: embed});
    }
    else{
        let quote = sayings.get(args);
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
        else{
            embed.setDescription("- Anonymous");
        }
        message.channel.send({embed: embed});
    }

};

function fetchSayJSON(){
    sayings = new Map();
    for(let key in sayJSON){
        sayings.set(key, sayJSON[key]);
    }
}