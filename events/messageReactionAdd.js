exports.run = (client, messageReaction) => {
    //console.log(messageReaction.emoji.identifier);
    if(messageReaction.emoji.id === "310668328794587138"){
        messageReaction.message.react("310668328794587138")
            .then(() => {})
            .catch(console.log)
    }
    if(messageReaction.emoji.id === "310701468061794304"){
        messageReaction.message.react("310701468061794304")
            .then(() => {})
            .catch(console.log)
    }
    if(messageReaction.emoji.identifier === "%F0%9F%A4%9C" || messageReaction.emoji.identifier === "%F0%9F%91%8A"){
        messageReaction.message.react("%E2%9C%8B")
            .then(() => {})
            .catch(console.log)
    }
    if(messageReaction.emoji.identifier === "%F0%9F%A4%94" ){
      messageReaction.message.react("%F0%9F%A4%94")
        .then(()=>{})
        .catch(console.log)
    }
};
