exports.run = (client, message, messageReaction) => {
    console.log(messageReaction.emoji.identifier);
    if(messageReaction.emoji.id === "310668328794587138"){
        message.react("310668328794587138")
            .then(() => {})
            .catch(console.log)
    }
};