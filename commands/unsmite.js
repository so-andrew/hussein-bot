function unsmite(message, args){
    let user =  message.guild.member(message.author.id);
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
    }
}