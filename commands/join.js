exports.run = (client, message) => {
    console.log("Command !%s received from %s", "join", message.author.username);
    if(message.member.voiceChannel){
        message.member.voiceChannel.join()
            .then(() =>{})
            .catch(console.log);
    }
    else message.reply('join a voice channel first.');
};