module.exports = {
    name: 'messagetest',
    description: 'Message test function',
    dev: true,
    async execute(message){
        const messageCollection = await message.channel.fetchMessages();
        const botMessageCollection = messageCollection.filter(m => m.author.bot);
        const pogMessages = [];
        for(const m of botMessageCollection.values()){
            if(m.embeds && m.embeds.length){
                if(m.embeds[0].title === "Pog Jar"){
                    console.log(m.embeds[0].title);
                    pogMessages.push(m);
                }
            }
            else console.log("No Embeds");
        }
    }
}