const fs = require('fs');

module.exports = {
    name: 'removetwitch',
    aliases: ['twitchremove, removestream'],
    description: "Removes a streamer from the tracker, turning off stream notifications.",
    params: "`[username]` (required)",
    category: "twitch",
    cooldown: 3,
    execute(message, args){
        if(!message.guild) return message.channel.send("Must be used in a guild text channel.");
        console.log(`Command ${module.exports.name} received from ${message.author.username} in ${message.guild.name} with args ${args}.`);
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have the proper permissions to use this command.");
        if(!args || !args.length) return message.channel.send("Not enough parameters.");
        try{
            fs.unlinkSync(`./data/streamers/${message.guild.id}/${args[0]}.json`);
            console.log(`Streamer ${args[0]} removed from tracker for ${message.guild.name}.`);
            return message.channel.send(`Notifications are now off for \`${args[0]}\`.`)
        }
        catch(error){
            console.log(`Attempt to delete ${args[0]} from ${message.guild.name}'s tracker failed, does not exist.`);
            return message.channel.send("No such streamer exists in the tracker.");
        }
    }
}
