exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "clean", message.author.username);
    if(message.channel.type === "dm"){
        message.channel.send("Cannot delete messages in a DM channel.");
        return;
    }
    if(args && args.length){
        clean(message, args);
    }
    else message.channel.send("Please input a valid number of messages to delete.");
};

async function clean(message, args){
    if(!isNaN(args)){
        let pluralString = args[0] == 1 ? "" : "s";
        const messageCollection = await message.channel.fetchMessages({limit: parseInt(args) + 1});
        await message.channel.bulkDelete(messageCollection).catch(error => console.log(error.stack));
        const sentMessage = await message.channel.send("Deleted `" + args + "` message" + pluralString + ". <:dab:310668328794587138>");
        await sentMessage.delete(3000);
    }
    else message.channel.send("Please enter a numerical argument.");
}
