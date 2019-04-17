const twitch = require("./twitch.js");
const utils = require("./utils.js");

module.exports = {
    name: "twitchint",
    description: "Sets twitch interval",
    dev: true,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(!args || !args.length) return message.channel.send("Needs parameters.");
        let minutes = parseInt(args[0]);
        if(minutes > 0){
            clearInterval(message.client.twitchCheckInterval);
            message.client.twitchCheckInterval = setInterval(twitch.twitchCheck, 60000 * minutes, message.client);
            console.log(`${utils.currentTime()} - Interval set to ${parseInt(args[0])} minutes.`);
            return message.channel.send(`Interval set to ${parseInt(args[0])} minutes.`);
        }
        else return message.channel.send("Invalid argument.");
    }
}
