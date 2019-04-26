module.exports.sweepPogReplies = async(client) => {
    for(const guild of client.guild.values()){
        const channels = guild.channels.filter(c => c.type === "text");
        for(const channel of channels){
            const messageCollection = await channel.fetchMessages();
            const botMessageCollection = messageCollection.filter(m => m.author.bot);
            const pogMessages = [];
            for(const m of botMessageCollection.values()){
                if(m.embeds && m.embeds.length){
                    if(m.embeds[0].title === "Pog Jar"){
                        console.log(m.embeds[0].title);
                        pogMessages.push(m);
                    }
                }
            }
            await channel.bulkDelete(pogMessages).catch(error => console.log(error.stack));
            console.log(`Purged ${pogMessages.length} pog message(s) in ${channel.name}`);
        }
    }
}