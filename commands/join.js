module.exports = {
    name: 'join',
    description: "Joins the voice channel that the invoking user is in.",
    dev: true,
    guildOnly: true,
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(message.member.voiceChannel){
            message.member.voiceChannel.join()
                .then(() =>{})
                .catch(console.log);
        }
        else message.reply('join a voice channel first.');
    }
}
