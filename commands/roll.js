const Discord = require("discord.js");

module.exports = {
    name: 'roll',
    aliases: ['rand', 'random'],
    description: "Rolls a number from 1 to the provided number, inclusive. If no number is provided, the function rolls a number from 1 to 100, inclusive.",
    params: "`[number]` (optional)",
    exinput: "`!roll 100`",
    exoutput: "`<@197598081867448320> rolls a 21!`",
    category: "utility",
    cooldown: 3,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(!args || !args.length) roll(message, 100);
        else if(!isNaN(args[0]) && args[0] > 0) roll(message, parseInt(args[0]));
        else message.channel.send("Please enter a valid number.");
    }
}

function roll(message, range){
    let rollInt = Math.floor(Math.random() * range) + 1;
    const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} rolled a **${rollInt}**!`);
    if(message.channel.type === "dm") embed.setColor(3447003);
    else embed.setColor(message.member.displayHexColor);
    if(rollInt === 69) embed.setDescription("Nice.");
    else if(rollInt === 4) embed.setDescription("FOUR");
    else if(rollInt === range) embed.setDescription("Wow, that's a big ol roll. Lots of numbers on your roll.");
    else if(rollInt === 1) embed.setDescription("LMAO");
    else if(rollInt >= range * 0.5) embed.setDescription("That's a pretty good roll if I do say so myself.");
    else if(rollInt < range * 0.5) embed.setDescription("I could have done better.");
    message.channel.send({embed: embed});
}
