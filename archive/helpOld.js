const helpJSON = require('../help.json');
let helpFile = new Map();

exports.run = (client, message, args) => {
    fetchHelpJSON();
    console.log("Command !%s received from %s", "help", message.author.username);
    if(args === null){
        message.channel.send("__**Commands:**__\n\n**Primary Commands:** `insult`, `m`, `clean`, `setgame`, `about` \n" + "**Mod Commands:** `smite`, `unsmite`\n" + "**Original Macros:** `doajig`, `england`, `obliterate`, `pizzatime`\n" + "**User Macro System:** `m create`, `m search`, `m delete`, `m list`");
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
        if (cmdHelp.type === "function"){
            message.channel.send(`\`!${args}\`\n\n${cmdHelp.desc}\n\n**Parameters**: ${cmdHelp.params}\n\n**Example**:\n\nInput: ${cmdHelp.exinput}\nOutput: ${cmdHelp.exoutput}`);
        }
        else if (cmdHelp.type === "macro"){
            message.channel.send(`\`!${args}\`\n\n${cmdHelp.desc}\n\n**Parameters**: ${cmdHelp.params}\n\n`);
        }
    }
    else message.channel.send("No such command exists.");
}