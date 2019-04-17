module.exports = {
    name: 'smite',
    description: "Strips the mentioned user of their basic human rights. Only wieldable by the bot's creator, and will not work on admins.",
    category: "mod",
    params: "`@mention` (required)",
    exinput: "`!smite` <@231184514997551114>",
    exoutput: "<@231184514997551114> BEGONE THOT",
    guildOnly: true,
    cooldown: 5,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(message.guild.name !== "Memespeak") message.channel.send("Wrong server, nerd.");
        else{
            if(!args || !args.length) message.channel.send("No one to smite.");
            else smite(message);
        }
    }
}

// TODO: rewrite smite function to be extensible to other servers
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
    }
}
