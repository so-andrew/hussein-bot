const fs = require('fs');

module.exports = {
    name: 'settwitchrole',
    description: "Sets the Twitch notification role to a given role in the server.",
    category: "twitch",
    params: "`Role mention` (required)",
    cooldown: 3,
    async execute(message, args){
        if(message.channel.type !== "text") return message.channel.send("Must be used in a guild text channel.");
        console.log(`Command ${module.exports.name} received from ${message.author.username} in ${message.guild.name}.`);
        if(!args || !args.length) return message.channel.send("Not enough paramters.");
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have the proper permissions to use this command.");
        if(message.mentions.roles.size === 0) return message.channel.send("No valid roles mentioned, try again.");
        const role = message.mentions.roles.first();
        try{
            const guildPrefs = JSON.parse(fs.readFileSync(`./data/guilds/${message.guild.id}.json`));
            const successfulAssignment = setNotificationRole(guildPrefs, role);
            if(!successfulAssignment) console.log("Assignment failed, continue to save.");
            try{
                fs.writeFileSync(`./data/guilds/${message.guild.id}.json`, JSON.stringify(guildPrefs));
                message.client.guildPrefs.set(guildPrefs.id, guildPrefs);
                console.log(`Notification role for ${message.guild.name} updated to ${role.name}.`);
                return message.channel.send(`Notification role updated to ${role.toString()}.`);
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
}

function setNotificationRole(object, role){
    if(object.hasOwnProperty("notificationRole")){
        object.notificationRole = role.id;
        return true;
    }
    return false;
}
