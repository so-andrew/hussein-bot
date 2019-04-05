const whitelist = require("../data/whitelist.json");
const config = require("../config.json");

module.exports = {
    name: 'disable',
    description: "Disables a given command until re-enabled.",
    execute(message, args){
        console.log("Command !%s received from %s", "disable", message.author.username);
        if(message.client.commands.has(args[0]) && message.author.id == config.ownerID){
          if(!message.client.disable.has(args[0])){
            message.client.disable.set(args[0]);
            console.log(`Function ${args[0]} disabled.`);
          }
          else{
            console.log(`Function ${args[0]} is already disabled.`);
          }
        }
        else if(!message.client.commands.has(args[0])){
          console.log(`ERROR: The specified function either does not exist or cannot be disabled.`);
        }
        else if(message.author.id != config.ownerID){
          console.log(`User ${message.author.username} does not have the proper permissions.`);
        }
    }
}
