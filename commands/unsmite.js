exports.run = (message) => {
    let user = message.guild.member(message.author.id);
    if (user.roles.has('231570844185395200')) {
        if (message.mentions) {
            let smitedUser = message.mentions.members.first();
            smitedUser.removeRole("238285183613272064")
                .then(() => {
                    message.channel.send("<@" + smitedUser.user.id + "> BEGONE THOT")
                        .then(sentMessage => {
                            sentMessage.react("310668328794587138")
                                .then(() => {
                                })
                                .catch(console.log)
                        })
                        .catch(console.log);
                    console.log("User " + smitedUser.user.username + " smited.");
                })
                .catch(console.log);
        }
        else message.channel.send("This command requires the use of mentions.")
        /*let user =  message.guild.member(message.author.id);
        if (user.roles.has('231570844185395200')){
            let index = args.search(/\d+/);
            let smiteID = args.slice(index, args.length - 1);
            if(message.guild.members.has(smiteID)){
                let smitedUser = message.guild.member(smiteID);
                smitedUser.addRole("238285183613272064")
                    .then( () => {
                        message.channel.send("<@" + smiteID + "> unsmited.");
                        console.log("User " + smitedUser.user.username + " unsmited.");
                    })
                    .catch(console.log);
            }
            else{
                message.channel.send("This command requires the use of mentions.")
            }
        }*/
    }
};