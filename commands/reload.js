exports.run = async (client, message, args) => {
    console.log(`Command !%s received from %s`, "reload", message.author.username);
    if(!args || !args.length){
        return message.channel.send("Please specify a command to reload.");
    }
    else{
        try{
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            const sentMessage = await message.channel.send(`The \`${args[0]}\` command has been reloaded.`)
            if(message.channel.type !== "dm"){
                sentMessage.delete(3000);
                message.delete(3000);
            }
        }
        catch(err){
            console.error(err);
        }
    }
};
