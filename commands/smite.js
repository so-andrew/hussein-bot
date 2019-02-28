exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "smite", message.author.username);
    if(message.guild.name !== "Memespeak"){
        message.channel.send("Wrong server, nerd.");
    }
    else{
        if(!args || !args.length){
            message.channel.send("No one to smite.");
        }
        else{
            smite(message);
        }
    }
};

function smite(message){
    let user =  message.guild.member(message.author.id);
    if (user.roles.has('231570844185395200')){
        if(message.mentions){
            let smitedUser = message.mentions.members.first();
            smitedUser.removeRole("238285183613272064")
                .then( () => {
                    message.channel.send("<@" + smitedUser.user.id + "> BEGONE THOT")
                        .then(sentMessage => {
                            sentMessage.react("310668328794587138")
                                .then(()=>{})
                                .catch(console.log)
                        })
                        .catch(console.log);
                    console.log("User " + smitedUser.user.username + " smited.");
                })
                .catch(console.log);
        }
        else message.channel.send("This command requires the use of mentions.")

        /*let index = args[0].search(/\d+/);
        let smiteID = args[0].slice(index, args.length - 1);
        if(message.guild.members.has(smiteID)){
            let smitedUser = message.guild.member(smiteID);
            smitedUser.removeRole("238285183613272064")
                .then( () => {
                    message.channel.send("<@" + smiteID + "> BEGONE THOT")
                        .then(sentMessage => {
                            sentMessage.react("310668328794587138")
                                .then(()=>{})
                                .catch(console.log)
                        })
                        .catch(console.log);
                    console.log("User " + smitedUser.user.username + " smited.");
                })
                .catch(console.log);
        }
        else{
            message.channel.send("This command requires the use of mentions.")
        }
        */
    }
}
