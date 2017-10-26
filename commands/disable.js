const fs = require("fs");
const whitelist = require("../whitelist.json");
const config = require("../config.json");

exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "disable", message.author.username);
    if(whitelist.list.indexOf(args[0])!= -1 && message.author.id == config.ownerID){
      //console.log(client.disable.indexOf(args[0]));
      if(client.disable.indexOf(args[0]) == -1){
        client.disable.push(args[0]);
        //console.log(client.disable.valueOf());
        console.log(`Function ${args[0]} disabled.`);
      }
      else{
        console.log(`Function ${args[0]} is already disabled.`);
      }
    }
};
