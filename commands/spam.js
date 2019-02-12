exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "spam", message.author.username);
    if(!args){
      message.channel.send("No argument specified.");
    }
    else {
      interval = setInterval(function(){
        message.channel.send(args.join(" "))
      }, 10000);
    }
};
