exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "setgame", message.author.username);
    if (!args) {
        message.channel.send("No game specified.");
    }
    else {
        client.user.setPresence({game: {name: args.join(" "), type: 0}});
            //.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
            //.catch(console.error);
        message.channel.send('Changed game to **' + args.join(" ") + '**.');
    }
};
