const presence = require("../commands/presence.js")

module.exports = {
    name: 'crabrave',
    description: "Crab rave audio macro with support for custom messages.",
    params: "`String` (optional)",
    exinput: "`!crabrave SHE'S LEGAL`",
    exoutput: ":crab: :crab: **SHE'S LEGAL** :crab: :crab:",
    category: "novelty",
    cooldown: 10,
    async execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(!args || !args.length) message.channel.send(":crab: :crab: **CRAB RAVE** :crab: :crab:");
        else message.channel.send(`:crab: :crab: **${args.join(" ")}** :crab: :crab:`);
        if(message.channel.type === "text" && message.member.voiceChannel){
            try{
                const connection = await message.member.voiceChannel.join();
                message.client.user.setPresence({ status:'online', game: {name: 'CRAB RAVE'}});
                const dispatcher = connection.playFile('./resources/crabrave.mp3');
                dispatcher.setVolume(0.15);
                dispatcher.on('end', async () => {
                    try{
                        const connection = await message.client.voiceConnections.get(message.guild.id);
                        setTimeout(()=>{
                           connection.disconnect();
                           presence.setPresence(message.client);
                        }, 3000);
                    }
                    catch(err){
                        console.log(err);
                    }
                });
                dispatcher.on('error', err => {
                    console.log(err);
                });
            }
            catch(err){
                console.error(err);
            }
        }
    }
}
