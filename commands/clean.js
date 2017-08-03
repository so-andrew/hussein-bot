exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "clean", message.author.username);
    if(args !== null){
        clean(message, args);
    }
    else message.channel.send("Please input a valid number of messages to delete.");
};

function clean(message, args){
    if(!isNaN(args)){
        message.channel.fetchMessages({limit: parseInt(args) + 1})
            .then(messageCollection => {
                message.channel.bulkDelete(messageCollection);
                if (parseInt(args) === 1) {
                    message.channel.send("Deleted `" + args + " message`. <:dab:310668328794587138>")
                        .then(sentMessage => {
                            sentMessage.delete(3000);
                        }).catch(console.log);
                }
                else{
                    message.channel.send("Deleted `" + args + " messages`. <:dab:310668328794587138>")
                        .then(sentMessage =>{
                            sentMessage.delete(3000);
                        })
                        .catch(console.log);
                }
            }).catch(console.log);
    }
    else message.channel.send("Please input a valid number of messages to delete.");
}