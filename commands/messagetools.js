module.exports.sweepPogReplies = async(client) => {
    for(const guild of client.guilds.values()){
        const channels = guild.channels.filter(c => c.type === "text");
        for(const channel of channels.values()){
            const messageCollection = await channel.fetchMessages();
            const botMessageCollection = messageCollection.filter(m => m.author.bot);
            const pogMessages = [];
            for(const m of botMessageCollection.values()){
                if(m.embeds && m.embeds.length){
                    if(m.embeds[0].title === "Pog Jar") pogMessages.push(m);
                }
            }
            if(pogMessages.length !== 0){
                try{
                    await channel.bulkDelete(pogMessages);
                    console.log(`Purged ${pogMessages.length} pog message(s) in ${guild.name} - ${channel.name}`);
                }
                catch(error){
                    console.error(error);
                    console.log(`A problem occurred while deleting messages in ${guild.name} - ${channel.name}`);
                }
            }
        }
    }
}

module.exports.validatePerms = (client) => {
    for(const guild of client.guilds.values()){
        const role = await guild.roles.find(role => role.name === "Basic Human Rights")
        if(!role) continue;
        if(!role.hasPermission('CHANGE_NICKNAME')){
            console.log("Cannot change nickname, modifying perms.");
            role.setPermissions(['VIEW_CHANNEL', 'SEND_MESSAGES', 'CHANGE_NICKNAME','EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'CONNECT', 'SPEAK', 'USE_VAD']);
        }
    }
}
