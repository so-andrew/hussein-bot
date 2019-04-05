module.exports = {
    name: 'obliterate',
    description: "Returns a gif of the famous \"Exodia Obliterate\" scene from everyone's favorite anime based off of a children's card game. Mentioning <@219615190629613578> will instead return some classic fanart from <@278696840227061761>.",
    cooldown: 5,
    execute(message){
        console.log("Command !%s received from %s", "obliterate", message.author.username);
        if(message.guild.name === "Memespeak" && (message.mentions.members.first() === message.guild.members.get("219615190629613578"))) message.channel.send("**EXODIA OBLITERATE**\n\nhttp://i.imgur.com/75HSAsh.png");
        else message.channel.send("**EXODIA OBLITERATE**\n\nhttp://i.imgur.com/1PiS4Lu.gif");
    }
}
