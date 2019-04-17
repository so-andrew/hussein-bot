const presence = require("./presence.js");

module.exports = {
    name: 'setwatch',
    description: "Sets Hussein Bot's presence on Discord (shown in the member list) and turns off the default presence rotation. Use `!setwatch reset` to resume rotation.",
    params: "`String` (required)",
    exinput: "`!setwatch Avengers: Endgame`",
    exoutput: "Changed watching to **Avengers: Endgame**.",
    category: "fun",
    cooldown: 3,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if (!args || !args.length) return message.channel.send("No argument specified.");
        else if(args[0] === "reset"){
            presence.setPresence(message.client);
            clearInterval(message.client.presenceInterval);
            message.client.presenceInterval = setInterval(presence.setPresence, 60000*5, message.client);
            message.channel.send("Presence rotation in effect.");
            console.log("Presence rotation in effect.");
        }
        else {
            clearInterval(message.client.presenceInterval);
            message.client.user.setPresence({game: {name: args.join(" "), type: 3}});
            message.channel.send(`Changed watching to **${args.join(" ")}**.`);
            console.log("Presence rotation disabled.");
        }
    }
}
