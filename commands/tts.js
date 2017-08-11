exports.run = (client, message, args) => {
    if(message.author.id === "197598081867448320"){
        message.channel.send(`${args.join(" ")}`, {tts:true});
    }
};