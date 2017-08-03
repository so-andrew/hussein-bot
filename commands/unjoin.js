exports.run = (client, message) =>{
    console.log("Command !%s received from %s", "unjoin", message.author.username);
    if (message.member.voiceChannel){
        message.member.voiceChannel.leave();
    }
    else message.reply(", you have to be in a voice channel to issue voice commands.");
};