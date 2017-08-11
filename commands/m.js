const urlRegex = new RegExp("(http(s)?:\/\/)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\/?([-a-zA-Z0-9@:%_+.~#?&/=]*)");
const config = require("../config.json");

exports.run = (client, message, args) => {
    
    if(args[0] === "create"){
        //args[2].indexOf("http") !== -1
        console.log(urlRegex.test(args[2]));
        console.log(args[2]);
        if(args.length === 3 && urlRegex.test(args[2])){
            if(!client.macros.has(args[1])){
                client.macros = createMacro(message, client.macros, args);
            }
            else message.channel.send("This macro already exists.");
        }
        else{
            message.channel.send("Command usage: `!m create [name] [link]`");
        }
    }
    else if(args[0] === "search"){
        if(args.length === 2){
            if(searchMacro(client.macros, args[1])){
                message.channel.send(`Macro \`${args[1]}\` exists.`);
            }
            else message.channel.send("No such macro exists.");
        }
        else{
            message.channel.send("Command usage: `!m search [name]`");
        }
    }
    else if(args[0] === "delete"){
        if(args.length === 2){
            client.macros = deleteMacro(message, client.macros, args[1]);
        }
        else{
            message.channel.send("Command usage: `!m delete [name]`");
        }
    }
    else if(args[0] === "list"){
        listMacros(message, client.macros);
    }
    else if(args[0] === "edit"){
        if(args.length === 3){
            editMacro(message, client.macros, args)
        }
        else message.channel.send("Command usage: `!m edit [name] [name/link]`");
    }
    else{
        retrieveMacro(message, client.macros, args[0]);
    }
};

function createMacro(message, macros, args){
    let newMacro = {
        name: args[1].toLowerCase(),
        text: args[2],
        creatorID: message.author.id
    };
    macros.set(args[1].toLowerCase(), newMacro);
    message.channel.send(`Macro \`${args[1].toLowerCase()}\` created.`);
    return macros;
}

function retrieveMacro(message, macros, arg){
    if(macros.has(arg)){
        message.channel.send(macros.get(arg).text)
            .then(()=>{})
            .catch(console.log);
        //console.log(macros.get(arg));
    }
    else{
        message.channel.send("No such macro exists.");
    }
}

function searchMacro(macros, arg){
    return !!macros.has(arg);
}

function deleteMacro(message, macros, arg){
    if(macros.has(arg)){
        if(message.author.id === macros.get(arg).creatorID || message.author.id === config.ownerID){
            macros.delete(arg);
            message.channel.send(`Macro \`${arg}\` deleted.`);
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
    let macroList = "List of macros: ";
    for (let key of macros.keys()) {
        macroList += `\`${macros.get(key).name}\`, `;
    }
    message.channel.send(macroList.slice(0, (macroList.length-2)));
}

function editMacro(message, macros, args){
    //edit name link
    if(macros.has(args[1])){
        let macroToEdit = macros.get(args[1]);
        if(message.author.id === macroToEdit.creatorID || message.author.id === config.ownerID){
            macros.delete(args[1]);
            if(urlRegex.test(args[2])||args[2].indexOf("http")!==-1){
                macroToEdit.text = args[2];
                macros.set(args[1], macroToEdit);
                message.channel.send(`Macro \`${args[1]}\` contents changed to \`${args[2]}\`.`)
            }
            else{
                macroToEdit.name = args[2].toLowerCase();
                macros.set(args[2].toLowerCase(), macroToEdit);
                message.channel.send(`Macro \`${args[1]}\` changed to \`${args[2].toLowerCase()}\`.`);
            }
        }
        else message.channel.send("This is not your macro to edit!");
    }
    else message.channel.send("No such macro exists.");

}