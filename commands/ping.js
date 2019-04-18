module.exports = {
    name: "ping",
    description: "Returns Hussein Bot's average ping to Discord.",
    category: "utility",
    params: "None",
    cooldown: 5,
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        return message.channel.send(`Hussein Bot's average ping to Discord is ${message.client.ping}.`);
    }
}
