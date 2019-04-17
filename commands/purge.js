module.exports = {
    name: "purge",
    desc: "Purges the channel of all messages.",
    params: "`Integer` (required)",
    category: "mod",
    guildOnly: true,
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(message.channel.type === "dm") return message.channel.send("Cannot delete messages in a DM channel.");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the proper permissions to use this command.");
        purge();
    }
}

async function purge(message){
    const messageCollection = await message.channel.fetchMessages();
    await message.channel.bulkDelete(messageCollection).catch(error => console.log(error.stack));
    const sentMessage = await message.channel.send("Channel purged. <:dab:310668328794587138>");
    await sentMessage.delete(3000);
}
