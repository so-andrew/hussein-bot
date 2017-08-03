exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "setgame", message.author.username);
    if (args === null) {
        message.channel.send("No game specified.");
    }
    else {
        client.user.setPresence({status: 'online', game: {name: args}})
            .then(()=>{})
            .catch(console.log);

        message.channel.send('Changed game to **' + args + '**.');
    }
};