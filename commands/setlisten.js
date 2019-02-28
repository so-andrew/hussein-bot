exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "setlisten", message.author.username);
    if (!args || !args.length) {
        message.channel.send("No argument specified.");
    }
    else {
        client.user.setPresence({game: {name: args.join(" "), type: 2}});
            //.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
            //.catch(console.error);
        //message.channel.send('Changed game to **' + args.join(" ") + '**.');
    }
};
