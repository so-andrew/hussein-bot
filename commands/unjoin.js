module.exports = {
    name: 'unjoin',
    description: "Leaves the voice channel that the invoking user is in.",
    dev: true,
    guildOnly: true,
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if (message.member.voiceChannel) message.member.voiceChannel.leave();
        else message.reply(", you have to be in a voice channel to issue voice commands.");
    }
}
