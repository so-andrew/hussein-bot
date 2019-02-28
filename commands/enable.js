exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "enable", message.author.username);
    if(client.disable.indexOf(args[0]) != -1){
      client.disable.splice(client.disable.indexOf(args[0]), 1);
      console.log(`Function ${args[0]} enabled.`);
    }
    else{
      console.log(`Function ${args[0]} is not disabled.`);
    }

};
