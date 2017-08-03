exports.run = (client, message) => {
    console.log("Command !%s received from %s", "obliterate", message.author.username);
    if(message.guild.name === "Memespeak" && (message.mentions.members.first() === message.guild.members.get("219615190629613578"))){
        message.channel.send("**EXODIA OBLITERATE**\n\nhttp://i.imgur.com/75HSAsh.png");
    }else message.channel.send("**EXODIA OBLITERATE**\n\nhttp://i.imgur.com/1PiS4Lu.gif");
};