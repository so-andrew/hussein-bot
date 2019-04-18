const fs = require('fs');

module.exports = {
    name: "setprefix",
    description: "Sets the prefix for the server. Modifies the guild preferences file.",
    category: "mod",
    params: "`String` (required)",
    cooldown: 3,
    execute(message, args){
        if(message.channel.type !== "text") return message.channel.send("Must be used in a guild text channel.");
        console.log(`Command ${module.exports.name} received from ${message.author.username} in ${message.guild.name}.`);
        if(!args || !args.length) return message.channel.send("Please input a valid prefix.");
        if(message.member.hasPermission("MANAGE_GUILD")){
            if(args[0].length > 7) return message.channel.send("The prefix can contain 7 characters at maximum, try again.");
            try{
                const guildPrefs = JSON.parse(fs.readFileSync(`./data/guilds/${message.guild.id}.json`));
                const successfulAssignment = setPrefix(guildPrefs, args[0]);
                if(!successfulAssignment) console.log("Assignment failed, continue to save.");
                try{
                    fs.writeFileSync(`./data/guilds/${message.guild.id}.json`, JSON.stringify(guildPrefs));
                    message.client.guildPrefs.set(guildPrefs.id, guildPrefs);
                    console.log(`Prefix for ${message.guild.name} updated to ${args[0]}.`);
                    return message.channel.send(`Prefix updated to \`${args[0]}\`.`);
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

function setPrefix(object, prefix){
    if(object.hasOwnProperty("prefix")){
        object.prefix = prefix;
        return true;
    }
    return false;
}
