exports.run = (client, message) => {
    if(Math.floor(Math.random() * 10) % 2 === 0.0) {
        message.channel.send("Did someone say... **STAND**????????\n\n\n***REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE***");
    }
    else{
        message.channel.send("Did someone say... **STAND**????????\n\nLet me tell you how that reminds me of the show **JoJo's Bizarre Adventure**...");
    }
};