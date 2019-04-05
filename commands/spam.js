module.exports = {
    name: 'spam',
    description: "Spams a message.",
    cooldown: 30,
    execute(message, args){
        console.log(`Command !%s received from %s`, "spam", message.author.username);
        if(!args || !args.length) message.channel.send("No argument specified.");
        else{
            interval = setInterval(function(){
                message.channel.send(args.join(" "))
            }, 10000);
        }
    }
}
