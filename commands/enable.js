module.exports = {
    name: 'enable',
    description: "Enables a previously disabled command.",
    execute(message, args){
        console.log("Command !%s received from %s", "enable", message.author.username);
        if(message.client.disable.has(args[0])){
            message.client.disable.delete(args[0]);
            //message.client.disable.splice(message.client.disable.indexOf(args[0]), 1);
            console.log(`Function ${args[0]} enabled.`);
        }
        else{
            console.log(`Function ${args[0]} is not disabled.`);
        }
    }
}
