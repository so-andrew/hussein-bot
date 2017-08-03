const helpJSON = require('../help.json');
const Discord = require('discord.js');
let helpFile = new Map();

exports.run = (client, message, args) => {
    fetchHelpJSON();
    console.log("Command !%s received from %s", "help", message.author.username);
    if(args === null){
        const embed = new Discord.RichEmbed()
            .setTitle("Commands")
            .setColor(3447003)
            .setDescription("An index of commands currently supported by Hussein Bot.")
            .setFooter("Type !help [command] for more info on a specific command.")
            .addField("Primary Commands", "`insult`, `clean`, `setgame`, `about`")
            .addField("Mod Commands", "`smite`, `unsmite`")
            .addField("Original Macros", "`doajig`, `england`, `obliterate`, `pizzatime`")
            .addField("User Macro System", "`m create`, `m search`, `m delete`, `m list`");
        message.channel.send({embed: embed});
    }
    else help(message, args);
};

function fetchHelpJSON(){
    helpFile = new Map();
    for(let key in helpJSON){
        helpFile.set(key, helpJSON[key]);
    }
}

function help(message, args){
    if(helpFile.has(args)){
        let cmdHelp = helpFile.get(args);
        let embed;
        if (cmdHelp.type === "function"){
            embed = new Discord.RichEmbed()
                .setTitle(`!\`${args}\``)
                .setColor(3447003)
                .setDescription(cmdHelp.desc)
                .addField("Parameters", cmdHelp.params)
                .addField("Sample Input", cmdHelp.exinput)
                .addField("Sample Output", cmdHelp.exoutput);
        }
        else if (cmdHelp.type === "macro"){
            embed = new Discord.RichEmbed()
                .setTitle(`!\`${args}\``)
                .setColor(3447003)
                .setDescription(cmdHelp.desc)
                .addField("Parameters", cmdHelp.params);
        }
        message.channel.send({embed: embed});
    }
    else message.channel.send("No such command exists.");
}