exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "pizzatime", message.author.username);
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(connection => {
                message.channel.send("**PIZZA TIME**\n\nhttps://cdn.discordapp.com/attachments/231599783255605248/336404762587037696/unknown.png");
                let currentGame = client.user.presence.game.name;
                client.user.setPresence({ status:'online', game: {name: 'PIZZA TIME'}})
                    .then(() =>{})
                    .catch(console.log);
                const dispatcher = connection.playFile('./resources/pizzatheme.mp3');
                if(parseInt(args) === 0){
                    dispatcher.setVolume(0);
                }
                else dispatcher.setVolume(0.15);
                dispatcher.on('end', () => {
                    setTimeout(()=>{
                        try{
                            message.member.voiceChannel.leave();
                        }
                        catch(err){
                            console.log(err);
                        }
                        client.user.setPresence({ status:'online', game: {name: currentGame}})
                            .then(() =>{})
                            .catch(console.log);
                    }, 3000);
                });

                dispatcher.on('error', e => {
                    console.log(e);
                });
            })
            .catch(console.log);
    }
    else message.reply('join a voice channel first.');
};