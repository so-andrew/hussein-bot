module.exports = {
    name: 'tts',
    description: "Skeleton for a TTS function",
    execute(message, args){
        if(message.author.id === "197598081867448320") message.channel.send(`${args.join(" ")}`, {tts:true});
    }
}
