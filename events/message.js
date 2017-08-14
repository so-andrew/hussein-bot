const config = require("../config.json");

exports.run = (client, message) => {
    if (message.author.bot) return;
    if (/stand/i.test(message.content) && !message.content.startsWith(config.prefix)){
        let standRef = require("../commands/stand.js");
        standRef.run(client, message);
        return;
    }
    if (message.content.startsWith(config.prefix)){
        if(cooldown(client, message)){
            message.reply("this is a no spam zone!");
            return;
        }
        let indexOfFirstSpace = message.content.indexOf(' ');
        let cmd;
        let argsArray;
        if (indexOfFirstSpace === -1) {
            cmd = message.content.substring(1);
            argsArray = null;
        }
        else {
            cmd = message.content.substring(1, indexOfFirstSpace);
            argsArray = message.content.substring(indexOfFirstSpace + 1).split(" ");
        }
        try {
            let commandFile = require(`../commands/${cmd}.js`);
            commandFile.run(client, message, argsArray);
            client.cooldown.push(message.author.id);
            removeCooldown(client, message, 5);
        }
        catch (err) {
            console.error(err);
        }
    }
};

function cooldown(client, message){
    if(message.author.id === config.ownerID) {
        return false
    }
    else return client.cooldown.indexOf(message.author.id) !== -1;
}

function removeCooldown(client, message, timeInSeconds){
    let index = client.cooldown.indexOf(message.author.id);
    if(index !== -1){
        setTimeout(() => {
            client.cooldown = client.cooldown.splice(index, 0);
        }, timeInSeconds * 1000)
    }
}