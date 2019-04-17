const presence = require("./presence.js");

module.exports = {
    name: 'setgame',
    description: "Sets Hussein Bot's presence on Discord (shown in the member list) and turns off the default presence rotation. Use `!setgame reset` to resume rotation.",
    params: "`String` (required)",
    exinput: "`!setgame Tales of Berseria`",
    exoutput: "Changed game to **Tales of Berseria**.",
    category: "fun",
    cooldown: 3,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if (!args || !args.length) return message.channel.send("No game specified.");
        else if(args[0] == "reset"){
            presence.setPresence(message.client);
            clearInterval(message.client.presenceInterval);
            message.client.presenceInterval = setInterval(presence.setPresence, 60000*5, message.client);
            message.channel.send("Presence rotation in effect.");
            console.log("Presence rotation in effect.");
        }
        else {
            clearInterval(message.client.presenceInterval);
            message.client.user.setPresence({game: {name: args.join(" "), type: 0}});
            message.channel.send(`Changed game to **${args.join(" ")}**.`);
            console.log("Presence rotation disabled.");
        }
    }
}
