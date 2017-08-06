const urlRegex = new RegExp('/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g');

exports.run = (client, message, args) => {

    let argsArray;
    if(message.content.indexOf(" ")!== -1){
        argsArray = args.split(" ");
    }
    else{
        message.channel.send("Needs more arguments.");
        return;
    }

    if(argsArray[0] === "create"){
        if(argsArray.length === 3 && argsArray[2].indexOf("http") !== -1){
            if(!client.macros.has(argsArray[1])){
                client.macros = createMacro(message, client.macros, argsArray);
            }
            else message.channel.send("This macro already exists.");
        }
        else{
            message.channel.send("Command usage: `!m create [name] [link]`");
        }
    }
    else if(argsArray[0] === "search"){
        if(argsArray.length === 2){
            if(searchMacro(client.macros, argsArray[1])){
                message.channel.send(`Macro \`${argsArray[1]}\` exists.`);
            }
            else message.channel.send("No such macro exists.");
        }
        else{
            message.channel.send("Command usage: `!m search [name]`");
        }
    }
    else if(argsArray[0] === "delete"){
        if(argsArray.length === 2){
            client.macros = deleteMacro(message, client.macros, argsArray[1]);
        }
        else{
            message.channel.send("Command usage: `!m delete [name]`");
        }
    }
    else if(argsArray[0] === "list"){
        listMacros(message, client.macros);
    }
    else if(argsArray[0] === "edit"){
        if(argsArray.length === 3){
            editMacro(message, client.macros, argsArray)
        }
        else message.channel.send("Command usage: `!m edit [name] [name/link]`");
    }
    else{
        retrieveMacro(message, client.macros, argsArray[0]);
    }
};

function createMacro(message, macros, argsArray){
    let newMacro = {
        name: argsArray[1].toLowerCase(),
        text: argsArray[2],
        creatorID: message.author.id
    };
    macros.set(argsArray[1].toLowerCase(), newMacro);
    message.channel.send(`Macro \`${argsArray[1].toLowerCase()}\` created.`);
    return macros;
}

function retrieveMacro(message, macros, arg){
    if(macros.has(arg)){
        message.channel.send(macros.get(arg).text)
            .then(()=>{})
            .catch(console.log);
        console.log(macros.get(arg));
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
        if(message.author.id === macros.get(arg).creatorID || message.author.id === "197598081867448320"){
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

function editMacro(message, macros, argsArray){
    //edit name link
    if(macros.has(argsArray[1])){
        let macroToEdit = macros.get(argsArray[1]);
        if(message.author.id === macroToEdit.creatorID || message.author.id === "197598081867448320"){
            macros.delete(argsArray[1]);
            if(urlRegex.test(argsArray[2])||argsArray[2].indexOf("http")!==-1){
                macroToEdit.text = argsArray[2];
                macros.set(argsArray[1], macroToEdit);
                message.channel.send(`Macro \`${argsArray[1]}\` contents changed to \`${argsArray[2]}\`.`)
            }
            else{
                macroToEdit.name = argsArray[2].toLowerCase();
                macros.set(argsArray[2].toLowerCase(), macroToEdit);
                message.channel.send(`Macro \`${argsArray[1]}\` changed to \`${argsArray[2].toLowerCase()}\`.`);
            }
        }
        else message.channel.send("This is not your macro to edit!");
    }
    else message.channel.send("No such macro exists.");

}