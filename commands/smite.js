exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "smite", message.author.username);
    if(message.guild.name !== "Memespeak"){
        message.channel.send("Wrong server, nerd.");
    }
    else{
        if(args === null){
            message.channel.send("No one to smite.");
        }
        else{
            smite(message, args);
        }
    }
};

function smite(message, args){
    let user =  message.guild.member(message.author.id);
    if (user.roles.has('231570844185395200')){
        let index = args.search(/\d+/);
        let smiteID = args.slice(index, args.length - 1);
        if(message.guild.members.has(smiteID)){
            let smitedUser = message.guild.member(smiteID);
            smitedUser.removeRole("238285183613272064")
                .then( () => {
                    message.channel.send("<@" + smiteID + "> BEGONE THOT")
                        .then(sentmessage => {
                            sentmessage.react("310668328794587138")
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
    }
}