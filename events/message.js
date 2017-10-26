const config = require("../config.json");
const blacklist = require("../blacklist.json");
const filter = require("../filter.json");

exports.run = (client, message) => {
    if (message.author.bot) return;
    if (/stand/i.test(message.content) && !disableCheck(client, "stand") && !message.content.startsWith(config.prefix)){
        let standRef = require("../commands/stand.js");
        standRef.run(client, message);
        return;
    }
    if (filterCheck(message.content) && !disableCheck(client, "fightflight") && !message.content.startsWith(config.prefix)){
        let fightflight = require("../commands/fightflight.js");
        fightflight.run(client, message, true);
    }
    if (attackCheck(message.content) && !disableCheck(client, "fightflight") && !message.content.startsWith(config.prefix)){
        let fightflight = require("../commands/fightflight.js");
        fightflight.run(client, message, false);
    }
    if (message.content.startsWith(config.prefix)){
        if(cooldown(client, message)){
            message.reply("this is a no spam zone!");
            return;
        }
        let indexOfFirstSpace = message.content.indexOf(' ');
        let cmd;
        let argsArray;
        if (indexOfFirstSpace === -1) {
            cmd = message.content.substring(1);
            argsArray = null;
        }
        else {
            cmd = message.content.substring(1, indexOfFirstSpace);
            argsArray = message.content.substring(indexOfFirstSpace + 1).split(" ");
        }
        if(blacklistCheck(cmd) && !disableCheck(client, cmd)){
          try {
              let commandFile = require(`../commands/${cmd}.js`);
              commandFile.run(client, message, argsArray);
              client.cooldown.push(message.author.id);
              removeCooldown(client, message, 5);
          }
          catch (err) {
              console.log(`Command ${cmd} does not exist.`);
              console.log(err);
          }
      }
    }
};

function blacklistCheck(cmd){
  if(blacklist.music.indexOf(cmd)!== -1 || blacklist.yuki1.indexOf(cmd)!== -1 || blacklist.yuki2.indexOf(cmd)!== -1 || blacklist.yuki3.indexOf(cmd)!== -1 || blacklist.yuki4.indexOf(cmd)!== -1 || blacklist.eve.indexOf(cmd)!== -1){
    return false;
  }
  return true;
}

function disableCheck(client, cmd){
  if(client.disable.indexOf(cmd)!== -1){
    return true;
  }
  return false;
}

function filterCheck(content){
  for(i = 0; i < filter.curses.length; i++){
    var regex = new RegExp(filter.curses[i], 'i');
      if(regex.test(content)){
        //console.log("contains curse");
        return true;
      }
  }
  return false;
}

function attackCheck(content){
  for(i = 0; i < filter.attacks.length; i++){
    var regex = new RegExp(filter.attacks[i], 'i');
      if(regex.test(content)){
        //console.log("contains attack");
        return true;
      }
  }
  return false;
}

function cooldown(client, message){
    if(message.author.id === config.ownerID) {
        return false
    }
    else return client.cooldown.indexOf(message.author.id) !== -1;
}

function removeCooldown(client, message, timeInSeconds){
    let index = client.cooldown.indexOf(message.author.id);
    if(index !== -1){
        setTimeout(() => {
            client.cooldown = client.cooldown.splice(index, 0);
        }, timeInSeconds * 1000)
    }
}
