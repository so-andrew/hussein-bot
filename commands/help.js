const helpJSON = require('../data/help.json');
const Discord = require('discord.js');
let helpFile = new Map();

module.exports = {
    name: 'help',
    description: "Help function",
    execute(message, args){
        fetchHelpJSON();
        console.log("Command !%s received from %s", "help", message.author.username);
        if(!args || !args.length){
            const embed = new Discord.RichEmbed()
                .setTitle("Commands")
                .setColor(3447003)
                .setDescription("An index of commands currently supported by Hussein Bot.")
                .setFooter("Type !help [command] for more info on a specific command.")
                .addField("Primary Commands", "`insult`, `say`, `clean`, `pogjar`, `about`, `avatar`")
                .addField("Mod Commands", "`smite`, `unsmite`")
                .addField("Original Macros", "`doajig`, `england`, `obliterate`, `pizzatime`, `jojo`, `crabrave`")
                .addField("User Macro System", "`m create`, `m search`, `m delete`, `m list`, `m edit`, `m info`")
                .addField("League Player Rotation", "`gamemode print`, `gamemode next`, `gamemode refresh`");
            message.channel.send({embed: embed});
        }
        else help(message, args);
    }
}

function fetchHelpJSON(){
    helpFile = new Map();
    for(let key in helpJSON){
        helpFile.set(key, helpJSON[key]);
    }
}

function help(message, args){
    if(helpFile.has(args[0])){
        let cmdHelp;
        if((args[0] === "m" || args[0] === "gamemode") && args[1]){
            cmdHelp = helpFile.get(args.join(" "));
        }
        else cmdHelp = helpFile.get(args[0]);
        let embed;
        if (cmdHelp.type === "function"){
            embed = new Discord.RichEmbed()
                .setTitle(`\`!${cmdHelp.name}\``)
                .setColor(3447003)
                .setDescription(cmdHelp.desc)
                .addField("Parameters", cmdHelp.params)
                .addField("Sample Input", cmdHelp.exinput)
                .addField("Sample Output", cmdHelp.exoutput);
        }
        else if (cmdHelp.type === "macro"){
            embed = new Discord.RichEmbed()
                .setTitle(`\`!${cmdHelp.name}\``)
                .setColor(3447003)
                .setDescription(cmdHelp.desc)
                .addField("Parameters", cmdHelp.params);
        }
        message.channel.send({embed: embed});
    }
    else message.channel.send("No such command exists.");
}
