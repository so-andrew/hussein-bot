const Discord = require('discord.js');
const config = require('../config.json');
const helpjson = require('../help.json');
const client = new Discord.Client();
let cooldownBasic = [];

let helpfile = new Map();
for(var key in helpjson){
    helpfile.set(key, helpjson[key]);
}

client.login(String(config.token))
    .then(() =>{})
    .catch(console.log);

client.on('ready', () => {
    client.user.setPresence({ status:'online', game: {name: 'The Coon'}})
        .then(() =>{})
        .catch(console.log);
    console.log("Connected");
    console.log("Logged in as : ");
    console.log(`${client.user.username} - (${client.user.id})`);
});

client.on('message', message => {
    let prefix = '!';
    if(/stand/i.test(message.content) && message.author.id !== "338222977516568576" && !message.content.startsWith(prefix)){
        message.channel.send("Did someone say... **STAND**????????\n\n\n***REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE***");
    return;
    }
   if(message.content.startsWith(prefix)){
        let indexOfFirstSpace = message.content.indexOf(' ');
        let cmd;
        let argsPresent;
        if(cooldown(message.author.id)){
            message.reply("this is a no spam zone!");
            return;
        }
        if (indexOfFirstSpace === -1) {
            cmd = message.content.substring(1);
            argsPresent = false;
        }
        else {
            argsPresent = true;
            cmd = message.content.substring(1, indexOfFirstSpace);
            var args = message.content.substring(indexOfFirstSpace + 1);
        }

        if (cmd === 'insult') {
            console.log(`Command !%s received from %s`, cmd, message.author.username);
            if (argsPresent === false){
                message.channel.send("I can\'t insult people without mentioning their ethnicity! (No ethnicity specified)");
            }
            else{
                let clientmessage = insult(args);
                message.channel.send(clientmessage);
                cooldownBasic.push(message.author.id);
                removeCooldown(message.author.id, 5);
            }

        } else if (cmd === 'setgame') {
            console.log(`Command !%s received from %s`, cmd, message.author.username);
            if (argsPresent === false) {
                message.channel.send("No game specified.");
            }
            else {
                client.user.setPresence({status: 'online', game: {name: args}})
                    .then(()=>{})
                    .catch(console.log);

                message.channel.send('Changed game to **' + args + '**.');
                cooldownBasic.push(message.author.id);
                removeCooldown(message.author.id, 5);
            }

        } else if (cmd === 'doajig') {
            console.log(`Command !%s received from %s`, cmd, message.author.username);
            message.channel.send('Yes masta\n\n' + 'http://africaamericanculturalnarratives.weebly.com/uploads/2/5/0/4/25046162/6179333_orig.jpg');
            cooldownBasic.push(message.author.id);
            removeCooldown(message.author.id, 5);

        } else if (cmd === 'england') {
            console.log("Command !%s received from %s", cmd, message.author.username);
            if (argsPresent === false){
                message.channel.send("You know it's Nick Crompton and my collar stay poppin'\nYes, I can rap and no, I am not from Compton\nEngland is my city\nAnd if it weren't for Team 10, then the US would be shitty\nI'll pass it to Chance 'cause you know he stay litty");
                cooldownBasic.push(message.author.id);
                removeCooldown(message.author.id, 5);
            }
            else if (args === 'play') {
                if (message.member.voiceChannel) {
                    message.member.voiceChannel.join()
                        .then(connection => {
                            const dispatcher = connection.playFile('/Users/romanfederation/Desktop/hussein-bot/england.mp3');
                            dispatcher.setVolume(0.25);
                            message.channel.send("You know it's Nick Crompton and my collar stay poppin'\nYes, I can rap and no, I am not from Compton\nEngland is my city\nAnd if it weren't for Team 10, then the US would be shitty\nI'll pass it to Chance 'cause you know he stay litty");
                            dispatcher.on('end', () => {
                                setTimeout(()=>{
                                    message.member.voiceChannel.leave();
                                    message.channel.send("**NICK CROMPTON OUT**")
                                        .then(sentmessage => {
                                            sentmessage.react("310668328794587138")
                                                .then(()=>{})
                                                .catch(console.log)
                                        })
                                        .catch(console.log);
                                }, 3000);
                                cooldownBasic.push(message.author.id);
                                removeCooldown(message.author.id, 5);
                            });

                            dispatcher.on('error', e => {
                               console.log(e);
                            });
                    }).catch(console.log);
                }
            }

        } else if (cmd === 'help'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            if(argsPresent === false){
                message.channel.send("__**Commands:**__\n\n**Primary Commands:** `insult`, `clean`, `setgame`, `about` \n" + "**Mod Commands:** `smite`, `unsmite`\n" + "**Text Macros:** `doajig`, `england`\n" + "**Voice Macros:** `pizzatime`");
                cooldownBasic.push(message.author.id);
                removeCooldown(message.author.id, 5);
            }
            else help(message, args);

        } else if (cmd === 'about'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            message.channel.send("__**Hussein Bot: \"Hi I live here\"**__\n\nCreated by <@197598081867448320> using the Discord.js JavaScript library (Now with 200% more JavaScript)\n\nCredit to <@231973798436536322> for the idea and basic logic structure");
            cooldownBasic.push(message.author.id);
            removeCooldown(message.author.id, 5);
        }

        else if (cmd === 'smite'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            if(message.guild.name !== "Memespeak"){
                message.channel.send("Wrong server, nerd.");
            }
            else{
                if(argsPresent === false){
                    message.channel.send("No one to smite.");
                }
                else{
                    smite(message, args);
                    cooldownBasic.push(message.author.id);
                    removeCooldown(message.author.id, 5);
                }
            }
        }
        else if (cmd === 'unsmite'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            if(message.guild.name !== "Memespeak"){
                message.channel.send("Wrong server, nerd.");
            }
            else {
                if (argsPresent === false) {
                    message.channel.send("No one to unsmite.");
                }
                else {
                    unsmite(message, args);
                    cooldownBasic.push(message.author.id);
                    removeCooldown(message.author.id, 5);
                }
            }
        }
        else if (cmd === 'pizzatime'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(connection => {
                        message.channel.send("**PIZZA TIME**\n\nhttps://cdn.discordapp.com/attachments/231599783255605248/336404762587037696/unknown.png");
                        var currentGame = client.user.presence.game.name;
                        client.user.setPresence({ status:'online', game: {name: 'PIZZA TIME'}})
                            .then(() =>{})
                            .catch(console.log);
                        const dispatcher = connection.playFile('/Users/romanfederation/Desktop/hussein-bot/pizzatheme.mp3');
                        if(parseInt(args) === 0){
                            dispatcher.setVolume(0);
                        }
                        else dispatcher.setVolume(0.25);
                        dispatcher.on('end', () => {
                            setTimeout(()=>{
                                message.member.voiceChannel.leave();
                                client.user.setPresence({ status:'online', game: {name: currentGame}})
                                    .then(() =>{})
                                    .catch(console.log);
                            }, 3000);
                        });

                        dispatcher.on('error', e => {
                            console.log(e);
                        });
                })
                .catch(console.log);
            }
            else message.reply('join a voice channel first.');
        }
        else if (cmd === 'unjoin'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            if (message.member.voiceChannel){
                message.member.voiceChannel.leave();
            }
            else message.reply(", you have to be in a voice channel to issue voice commands.");
        }
        else if (cmd === 'clean'){
            console.log("Command !%s received from %s", cmd, message.author.username);
            if(argsPresent === true){
                clean(message, args);
            }
            else message.channel.send("Please input a valid number of messages to delete.");
        }
        else if (cmd === 'obliterate'){
            message.channel.send("**EXODIA OBLITERATE** \n\n http://i.imgur.com/1PiS4Lu.gif");
        }
    }
});

function cooldown(userID){
    if(userID === "197598081867448320") {
        return false
    }
    else return cooldownBasic.indexOf(userID) !== -1;
}

function removeCooldown(userID, timeInSeconds){
    let index = cooldownBasic.indexOf(userID);
    if(index !== -1){
        setTimeout(() => {
            cooldownBasic = cooldownBasic.splice(index, 0);
        }, timeInSeconds * 1000)
    }
}

function clean(message, args){
    if(!isNaN(args)){
        message.channel.fetchMessages({limit: parseInt(args) + 1})
            .then(messageCollection => {
                message.channel.bulkDelete(messageCollection);
                if (parseInt(args) === 1) {
                message.channel.send("Deleted `" + args + " message`. <:dab:310668328794587138>")
                    .then(sentmessage => {
                        sentmessage.delete(3000);
                    }).catch(console.log);
                }
                else{
                    message.channel.send("Deleted `" + args + " messages`. <:dab:310668328794587138>")
                        .then(sentmessage =>{
                            sentmessage.delete(3000);
                        })
                        .catch(console.log);
                }
            }).catch(console.log);
    }
    else message.channel.send("Please input a valid number of messages to delete.");
}

function insult(args){
    let clientmessage;
    let uck;
    if (Math.floor(Math.random() * 10) % 2 === 0.0) {
        uck = ' cuck!';
    }
    else {
        uck = ' fuck!';
    }
    if (/Italian/i.test(args)) {
        clientmessage = 'Listen here, you greasy ' + args + uck;
    }
    else {
        clientmessage = 'Listen here, you dirty ' + args + uck;
    }
    return clientmessage;
}

function smite(message, args){
    let user =  message.guild.member(message.author.id);
    if (user.roles.has('231570844185395200')){
        let index = args.search(/\d+/);
        let smiteID = args.slice(index, args.length - 1);
        if(message.guild.members.has(smiteID)){
            let smitedUser = message.guild.member(smiteID);
            smitedUser.removeRole("238285183613272064")
                .then( () => {
                    message.channel.send("<@" + smiteID + "> BEGONE THOT")
                        .then(sentmessage => {
                            sentmessage.react("310668328794587138")
                                .then(()=>{})
                                .catch(console.log)
                        })
                        .catch(console.log);
                    console.log("User " + smitedUser.user.username + " smited.");
                })
                .catch(console.log);
        }
        else{
            message.channel.send("This command requires the use of mentions.")
        }
    }
}

function unsmite(message, args){
    let user =  message.guild.member(message.author.id);
    if (user.roles.has('231570844185395200')){
        let index = args.search(/\d+/);
        let smiteID = args.slice(index, args.length - 1);
        if(message.guild.members.has(smiteID)){
            let smitedUser = message.guild.member(smiteID);
            smitedUser.addRole("238285183613272064")
                .then( () => {
                    message.channel.send("<@" + smiteID + "> unsmited.");
                    console.log("User " + smitedUser.user.username + " unsmited.");
                })
                .catch(console.log);
        }
        else{
            message.channel.send("This command requires the use of mentions.")
        }
    }
}

function help(message, args){
    if(helpfile.has(args)){
        let cmdHelp = helpfile.get(args);
        if (cmdHelp.type === "function"){
            // noinspection Annotator
            // noinspection Annotator
            // noinspection Annotator
            message.channel.send(`\`!${args}\`\n\n${cmdHelp.desc}\n\n**Parameters**: ${cmdHelp.params}\n\n**Example**:\n\nInput: ${cmdHelp.exinput}\nOutput: ${cmdHelp.exoutput}`);
        }
        else if (cmdHelp.type === "macro"){
            // noinspection Annotator
            message.channel.send(`\`!${args}\`\n\n${cmdHelp.desc}\n\n**Parameters**: ${cmdHelp.params}\n\n`);
        }
    }
    else message.channel.send("No such command exists.");
}