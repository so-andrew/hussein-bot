module.exports = {
    name: 'setwatch',
    description: "Sets Hussein Bot's presence on Discord (shown in the member list).",
    cooldown: 5,
    execute(message, args){
        console.log(`Command !%s received from %s`, "setwatch", message.author.username);
        if (!args || !args.length) message.channel.send("No argument specified.");
        else {
            message.client.user.setPresence({game: {name: args.join(" "), type: 3}});
                //.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
                //.catch(console.error);
            //message.channel.send('Changed game to **' + args.join(" ") + '**.');
        }

        // TODO: rewrite to be in line with setgame
    }
}
