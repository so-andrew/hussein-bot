let urlRegex = /(http(s)?:\/\/)(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&/=]*)?/g;

const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'm',
    description: "The base command for image macros. Returns the specified image from the database, if it exists. See `!help m create`, `!help m search`, `!help m delete`, `!help m list`, `!help m edit`, and `!help m info` for other commands related to the macro feature.",
    cooldown: 3,
    execute(message, args){
        if(!args || !args.length){
            message.channel.send("Needs more parameters.");
            return;
        }
        if(args[0] === "create"){
            //at least 3 arguments, args[1] cannot be a URL, args[2] must be a URL
            if(args.length === 3 && !urlRegex.test(args[1]) && urlRegex.test(args[2])){
                if(!message.client.macros.has(args[1])){
                    message.client.macros = createMacro(message, message.client.macros, args);
                }
                else message.channel.send("This macro already exists.");
            }
            else{
                message.channel.send("Command usage: `!m create [name] [link]`");
            }
        }
        else if(args[0] === "search"){
            if(args.length === 2){
                searchMacro(message, message.client.macros, args[1]);
            }
            else{
                message.channel.send("Command usage: `!m search [name]`");
            }
        }
        else if(args[0] === "delete"){
            if(args.length === 2){
                message.client.macros = deleteMacro(message, message.client.macros, args[1]);
            }
            else{
                message.channel.send("Command usage: `!m delete [name]`");
            }
        }
        else if(args[0] === "list"){
            listMacros(message, message.client.macros);
        }
        else if(args[0] === "edit"){
            if(args.length === 3){
                editMacro(message, message.client.macros, args)
            }
            else message.channel.send("Command usage: `!m edit [name] [name/link]`");
        }
        else if(args[0] === "info") {
            if (args.length === 2) {
                macroInfo(message, message.client.macros, args[1]);
            }
            else message.channel.send("Command usage: `!m info [name]`");
        }
        else{
            retrieveMacro(message, message.client.macros, args[0]);
        }
    }
}

function createMacro(message, macros, args){
    let newMacro = {
        name: args[1].toLowerCase(),
        text: args[2],
        creatorID: message.author.id,
        creatorName: message.author.username,
        uses: 0
    };
    macros.set(newMacro.name, newMacro);
    message.channel.send(`Macro \`${newMacro.name}\` created.`);
    console.log(`Macro ${newMacro.name} created by ${message.author.username}.`);
    return macros;
}

function retrieveMacro(message, macros, arg){
    if(macros.has(arg)){
      try{
        let macro = macros.get(arg);
        const embed = new Discord.RichEmbed()
            .setImage(macro.text)
            .setColor(3447003);
        message.channel.send({embed: embed});
        macro.uses++;
        macros.set(macro.name, macro);
        console.log(`Macro ${arg} invoked by ${message.author.username}.`);
      }
      catch(err){
        console.error(err);
      }
    }
    else{
        message.channel.send("No such macro exists.");
    }
}

function searchMacro(message, macros, arg){
    console.log(`Command !m search received from ${message.author.username} with arguments ${arg}.`);
    if(arg === "?" || arg === "*" || arg === "^" || arg === "\\" || arg === "$" || arg === "+"){
        arg = "\\" + arg;
    }
    let searchRegex = new RegExp(arg, "i");
    let msg = "";
    let found = false;

    function testMap(key, name){
        if(searchRegex.test(name)){
            msg += `\`${name}\`, `;
            found = true;
        }
    }
    macros.forEach(testMap);

    if(found){
        const embed = new Discord.RichEmbed()
            .setTitle("You may be looking for: ")
            .setDescription(msg.slice(0, (msg.length-2)))
            .setColor("DARK_BLUE");
        message.channel.send({embed: embed});
    }
    else message.channel.send("No such macro exists.");
}

function deleteMacro(message, macros, arg){
    if(macros.has(arg)){
        if(message.author.id === macros.get(arg).creatorID || message.author.id === config.ownerID){
            macros.delete(arg);
            message.channel.send(`Macro \`${arg}\` deleted.`);
            console.log(`Macro ${arg} deleted.`);
            return macros;
        }
        else{
            message.channel.send("This is not your macro to delete!");
        }
    }
    else{
        message.channel.send("No such macro exists.");
    }
}

function listMacros(message, macros) {
    let macroList = "";
    let macroCount = 0;
    for (let key of macros.keys()) {
        macroList += `\`${macros.get(key).name}\`, `;
        macroCount++;
    }
    const embed = new Discord.RichEmbed()
        .setTitle("List of Macros")
        .setDescription(macroList.slice(0, (macroList.length-2)))
        .setColor("DARK_RED")
        .setFooter(`Number of macros: ${macroCount}`);
    message.channel.send({embed: embed});
}

function editMacro(message, macros, args){
    if(macros.has(args[1])){
        let macroToEdit = macros.get(args[1]);
        if(message.author.id === macroToEdit.creatorID || message.author.id === config.ownerID){
            macros.delete(args[1]);
            if(urlRegex.test(args[2])){
                //argument is a URL, editing macro text
                macroToEdit.text = args[2];
                macros.set(args[1], macroToEdit);
                message.channel.send(`Macro \`${args[1]}\` contents changed to \`${args[2]}\`.`);
                console.log(`Macro ${args[1]} contents changed to ${args[2]}.`);
            }
            else{
                //argument is not a URL, editing macro name
                macroToEdit.name = args[2].toLowerCase();
                macros.set(macroToEdit.name, macroToEdit);
                message.channel.send(`Macro \`${args[1]}\` changed to \`${args[2].toLowerCase()}\`.`);
                console.log(`Macro ${args[1]} changed to ${args[2].toLowerCase()}.`);
            }
        }
        else message.channel.send("This is not your macro to edit!");
    }
    else message.channel.send("No such macro exists.");
}

function macroInfo(message, macros, arg){
    if(macros.has(arg)){
        let retrievedMacro = macros.get(arg);
        const embed = new Discord.RichEmbed()
            .setTitle(`\`${retrievedMacro.name}\``)
            .setDescription(retrievedMacro.text)
            .setColor(3447003)
            .setThumbnail(retrievedMacro.text)
            .addField("Creator", retrievedMacro.creatorName, true)
            .addField("Uses", retrievedMacro.uses, true);
        message.channel.send({embed: embed})
    }
    else message.channel.send("No such macro exists.");
}

function setUses(macros){
    let macrosArray = [];
    for(let key of macros.keys()){
        macrosArray.push(macros.get(key));
        console.log(macros.get(key));
    }
    console.log(macrosArray);
    for(let i = 0; i < macrosArray.length; i++){
        macros.delete(macrosArray[i].name);
        let newMacro = {
            name: macrosArray[i].name,
            text: macrosArray[i].text,
            creatorID: macrosArray[i].creatorID,
            uses: 0
        };
        macros.set(newMacro.name, newMacro);
    }
    console.log("This should work?");
    return macros;
}

function setUsername(message, macros){
    let macrosArray = [];
    for(let key of macros.keys()){
        macrosArray.push(macros.get(key));
        console.log(macros.get(key));
    }
    console.log(macrosArray);
    for(let i = 0; i < macrosArray.length; i++){
        macros.delete(macrosArray[i].name);
        let newMacro = {
            name: macrosArray[i].name,
            text: macrosArray[i].text,
            creatorID: macrosArray[i].creatorID,
            creatorName: message.guild.members.get(macrosArray[i].creatorID).user.username,
            uses: macrosArray[i].uses
        };
        macros.set(newMacro.name, newMacro);
    }
    console.log("This should work?");
    return macros;
}
