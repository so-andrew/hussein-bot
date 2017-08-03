exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "reload", message.author.username);
    if(args === null){
        return message.channel.send("Please specify a command to reload.");
    }
    else{
        delete require.cache[require.resolve(`./${args}.js`)];
        message.channel.send(`The \`${args}\` command has been reloaded.`)
            .then(sentMessage => {
                sentMessage.delete(3000);
                message.delete(3000);
            })
            .catch(console.log);
    }
}