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