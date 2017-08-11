exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "reload", message.author.username);
    if(!args){
        return message.channel.send("Please specify a command to reload.");
    }
    else{
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        message.channel.send(`The \`${args[0]}\` command has been reloaded.`)
            .then(sentMessage => {
                sentMessage.delete(3000);
                message.delete(3000);
            })
            .catch(console.log);
    }
};