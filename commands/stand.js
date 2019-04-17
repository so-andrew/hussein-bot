module.exports = {
    name: 'stand',
    description: "Replies to any and all references to stands from Jojo's Bizarre Adventure, no matter how relevant or miniscule.",
    dev: true,
    execute(message){
        if(Math.floor(Math.random() * 10) % 2 === 0.0) message.channel.send("Did someone say... **STAND**????????\n\n\n***REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE***");
        else message.channel.send("Did someone say... **STAND**????????\n\nLet me tell you how that reminds me of the show **JoJo's Bizarre Adventure**...");
    }
}
