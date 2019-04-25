module.exports = {
    name: 'cleanbot',
    description: "Deletes previous messages from a bot user.",
    params: "`Integer` (required)",
    exinput: "`!cleanbot 5`",
    exoutput: "Deleted 5 bot messages. <:dab:310668328794587138>",
    category: "mod",
    guildOnly: true,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(message.channel.type === "dm") return message.channel.send("Cannot delete messages in a DM channel.");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the proper permissions to use this command.");
        if(args && args.length) clean(message, args);
        else message.channel.send("Please input a valid number of messages to delete.");
      }
}

async function clean(message, args){
    if(!isNaN(args)){
        const messageCollection = await message.channel.fetchMessages();
        const botMessageCollection = messageCollection.filter(m => m.author.bot);
        if(botMessageCollection.size === 0) return message.channel.send(`No bot messages found within the last ${args[0]} messages.`);
	const pluralString = botMessageCollection.size == 1 ? "" : "s";
        const botMessageArray = Array.from(botMessageCollection.values());
        let size = args[0];
        if(size >= botMessageArray.size) size = botMessageArray.size;
        const messagesToDelete = botMessageArray.slice(0, size);
        await message.channel.bulkDelete(messagesToDelete).catch(error => console.log(error.stack));
        const sentMessage = await message.channel.send(`Deleted ${messagesToDelete.length} bot message${pluralString}. <:dab:310668328794587138>`);
        await sentMessage.delete(3000);
        message.delete();
    }
    else message.channel.send("Please enter a numerical argument.");
}
