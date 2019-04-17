const fs = require('fs');

module.exports = {
    name: "settwitch",
    description: "Sets the channel in which Twitch live notifications will appear. Modifies the guild preferences file.",
    params: "User must have \"Manage Server\" permission.",
    category: "twitch",
    cooldown: 3,
    execute(message, args){
        if(message.channel.type !== "text") return message.channel.send("Must be used in a guild text channel.");
        console.log(`Command ${module.exports.name} received from ${message.author.username} in ${message.guild.name}.`);
        if(!args || !args.length) return message.channel.send("Please input a valid channel. (use `#channel-name`)");
        if(message.member.hasPermission("MANAGE_GUILD")){
            if(message.mentions.channels.size === 0) return message.channel.send("No channels mentioned, try again.");
            const channel = message.mentions.channels.first();
            if(channel.type !== "text") return message.channel.send("This is not a valid text channel, try again");
            try{
                const guildPrefs = JSON.parse(fs.readFileSync(`./data/guilds/${message.guild.id}.json`));
                const successfulAssignment = setTwitchNotificationChannel(guildPrefs, channel);
                if(!successfulAssignment) console.log("Assignment failed, continue to save.");
                try{
                    fs.writeFileSync(`./data/guilds/${message.guild.id}.json`, JSON.stringify(guildPrefs));
                    message.client.guildPrefs.set(guildPrefs.id, guildPrefs);
                    console.log(`Twitch notification channel for ${message.guild.name} updated to ${channel.name}.`);
                    return message.channel.send(`Twitch notification channel updated to <#${channel.id}>.`);
                }
                catch(error){
                    console.error(error);
                    return message.channel.send("Could not write preferences file, please contact bot owner.")
                }
            }
            catch(error){
                console.error(error);
                return message.channel.send("No config file exists, please use `!config` to set guild preferences first.");
            }
        }
        else return message.channel.send("You do not have the proper permissions to use this command.");
    }
}

function setTwitchNotificationChannel(object, channel){
    if(object.hasOwnProperty("prefix")){
        object.twitchNotificationChannel = channel.id;
        return true;
    }
    else return false;
}
