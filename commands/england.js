exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "england", message.author.username);
    if (!args || !args.length){
        message.channel.send("You know it's Nick Crompton and my collar stay poppin'\nYes, I can rap and no, I am not from Compton\nEngland is my city\nAnd if it weren't for Team 10, then the US would be shitty\nI'll pass it to Chance 'cause you know he stay litty");
    }
    else if (args[0] === 'play') {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./resources/england.mp3');
                    dispatcher.setVolume(0.15);
                    message.channel.send("You know it's Nick Crompton and my collar stay poppin'\nYes, I can rap and no, I am not from Compton\nEngland is my city\nAnd if it weren't for Team 10, then the US would be shitty\nI'll pass it to Chance 'cause you know he stay litty");
                    dispatcher.on('end', () => {
                        setTimeout(()=>{
                            message.member.voiceChannel.leave();
                            message.channel.send("**NICK CROMPTON OUT**")
                                .then(sentmessage => {
                                    sentmessage.react("310668328794587138")
                                        .then(()=>{})
                                        .catch(console.log)
                                })
                                .catch(console.log);
                        }, 3000);
                    });

                    dispatcher.on('error', e => {
                        console.log(e);
                    });
                }).catch(console.log);
        }
    }
};
