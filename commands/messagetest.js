module.exports = {
    name: 'messagetest',
    description: 'Message test function',
    dev: true,
    async execute(message){
        const messageCollection = await message.channel.fetchMessages();
        const botMessageCollection = messageCollection.filter(m => m.author.bot);
        for(const m of botMessageCollection.values()){
            if(m.embeds) console.log(m.embeds[0]);
            else console.log("No Embeds");
        }
    }
}