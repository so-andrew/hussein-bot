//const config = require("../config.json");
const blacklist = require("../data/blacklist.json");
const filter = require("../data/filter.json");
const Discord = require("discord.js");
const twitchRegex = /(http(s)?:\/\/)(www.)?(twitch.tv\/cyn0va)/ig;

exports.run = async (client, message) => {
    // Ignore bot messages
    if(message.author.bot) return;
    // Non-command features
    let prefix = process.env.PREFIX;
    let offensiveAllowed = true;
    if(message.guild){
        if(client.guildPrefs.has(message.guild.id)){
            prefix = client.guildPrefs.get(message.guild.id).prefix;
            offensiveAllowed = client.guildPrefs.get(message.guild.id).offensive;
        }
    }
  
    const prev50Messages = await message.channel.fetchMessages({ limit: 25});
    const authorMessages = prev50Messages.filter(m => m.author.id === message.author.id);
    authorMessages.sweep((m) => m.content !== message.content);
    console.log(authorMessages);
    

    if(message.channel.type === "text" && !message.content.startsWith(prefix) && twitchRegex.test(message.content)){
        try{
            message.react(message.guild.emojis.find(emoji => emoji.name === "ResidentSleeper"));
        }
        catch(error){
            console.log("Emote does not exist.");
        }
    }
    if(pogCheck(message) && !disableCheck(client, "pog") && !message.content.startsWith(prefix)){
        if(!client.cooldowns.has("pog")) client.cooldowns.set("pog", new Discord.Collection());
        const now = Date.now();
        const timestamps = client.cooldowns.get("pog");
        const cdAmount = (client.commands.get("pog").cooldown || 3) * 1000;
        if(timestamps.has(message.author.id)){
            const expTime = timestamps.get(message.author.id) + cdAmount;
            if(now < expTime){
                const timeLeft = (expTime - now) / 1000;
                const warningMessage = await message.reply(`you cannot use the \`pog\` command for ${timeLeft.toFixed(1)} second(s).`);
                warningMessage.delete(3000);
            }
        }
        if(message.author.id !== process.env.OWNER_ID){
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cdAmount);
        }
        let pogType = whichPog(message);
        if(pogType === 2 || pogType === 3){
            try{
                const filter = m => (m.author.id === message.author.id);
                const collected = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
                if(ogCheck(collected.first()) || gCheck(collected.first())) client.commands.get("pog").execute(message, pogType);
            }
            catch(error){
                console.error(error);
            }
        }
        else client.commands.get("pog").execute(message, pogType);

        return;
    }

    // N function
    if(nCheck(message) && !message.content.startsWith(prefix) && offensiveAllowed){
        try{
            if(message.content.charCodeAt(0) < 97) message.channel.send("I");
            else message.channel.send("i");
            const filter = m => m.author.id === message.author.id;
            const collected = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
            if(gCheck(collected.first())){
                //console.log("G detected");
                if(message.content.charCodeAt(0) < 97) message.channel.send("G");
                else message.channel.send("g");
                const filter = m => m.author.id === message.author.id;
                const collected = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
                if(eCheck(collected.first())){
                    //console.log("E detected")
                    if(message.content.charCodeAt(0) < 97) message.channel.send("R");
                    else message.channel.send("R");
                }
            }
        }
        catch(error){
            console.error(error);
        }
        return;
    }

    if(/stand/i.test(message.content) && !disableCheck(client, "stand") && !message.content.startsWith(prefix)){
        client.commands.get("stand").execute(message);
        return;
    }

    /*if (filterCheck(message.content) && !disableCheck(client, "fightflight") && !message.content.startsWith(prefix)){
        let fightflight = require("../commands/fightflight.js");
        fightflight.run(client, message, true);
        return;
    }
    if (attackCheck(message.content) && !disableCheck(client, "fightflight") && !message.content.startsWith(prefix)){
        let fightflight = require("../commands/fightflight.js");
        fightflight.run(client, message, false);
        return;
    }*/

    // Command checks
    if(message.content.startsWith(prefix)){
        // Determine what command is being invoked
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        //if(!client.commands.has(cmdName)) return;

        const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
        if(!command) return;

        // Check activation conditions
        if(command.guildOnly && message.channel.type !== "text") return message.channel.send("This command can only be used in a guild text channel.");
        if(command.offensive && !offensiveAllowed) return message.channel.send("This command has been disabled.");
        if(!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Discord.Collection());
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cdAmount = (command.cooldown || 3) * 1000;
        if(timestamps.has(message.author.id)){
            const expTime = timestamps.get(message.author.id) + cdAmount;
            if(now < expTime){
                const timeLeft = (expTime - now) / 1000;
                const warningMessage = await message.reply(`you cannot use the \`${command.name}\` command for ${timeLeft.toFixed(1)} second(s).`);
                warningMessage.delete(3000);
            }
        }
        if(message.author.id !== process.env.OWNER_ID){
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cdAmount);
        }

        // Command execution
        if(blacklistCheck(cmdName) && !disableCheck(client, cmdName)){
            try{
                command.execute(message, args);
            }
            catch(err){
                console.error(err);
            }
        }
    }
};

function blacklistCheck(cmd){
    if(blacklist.music.indexOf(cmd)!== -1 || blacklist.eve.indexOf(cmd)!== -1){
      return false;
    }
    return true;
}

function disableCheck(client, cmd){
    return client.disable.has(cmd);
}

function filterCheck(content){
    for(i = 0; i < filter.curses.length; i++){
        var regex = new RegExp(filter.curses[i], 'i');
        if(regex.test(content)){
            return true;
        }
    }
    return false;
}

function attackCheck(content){
    for(i = 0; i < filter.attacks.length; i++){
        var regex = new RegExp(filter.attacks[i], 'i');
        if(regex.test(content)){
            return true;
        }
    }
    return false;
}

function pogCheck(message){
    let pogRegex = /p{1}\s*o{1}\s*g{1}/ig;
    let singlePRegex = /\bp{1}$/ig;
    let poRegex =/\bp{1}\s*o{1}$/ig;
    if(!message || !message.content) return false;
    return (pogRegex.test(message.content) || singlePRegex.test(message.content) || poRegex.test(message.content));
}

function ogCheck(message){
    let ogRegex = /^o{1}\s*g{1}$/ig;
    if(!message || !message.content) return false;
    return ogRegex.test(message.content);
}

function poCheck(message){
    let poRegex =/\bp{1}\s*o{1}$/ig;
    if(!message || !message.content) return false;
    return poRegex.test(message.content);
}

function gCheck(message){
    let gRegex = /^g{1}$/ig;
    if(!message || !message.content) return false;
    return gRegex.test(message.content);
}

function nCheck(message){
    let nRegex = /^n{1}$/ig;
    if(!message || !message.content) return false;
    return nRegex.test(message.content);
}

function gCheck(message){
    let gRegex = /^g{1}$/ig;
    if(!message || !message.content) return false;
    return gRegex.test(message.content);
}

function eCheck(message){
    let gRegex = /^e{1}$/ig;
    if(!message || !message.content) return false;
    return gRegex.test(message.content);
}

function whichPog(message){
    let pogRegex = /p{1}\s*o{1}\s*g{1}/ig;
    let singlePRegex = /\bp{1}$/ig;
    let poRegex =/\bp{1}\s*o{1}$/ig;
    if(pogRegex.test(message.content)){
        return 1;
    } else if(poRegex.test(message.content)){
        return 3;
    } else if(singlePRegex.test(message.content)){
        return 2;
    } else return 0;
}
