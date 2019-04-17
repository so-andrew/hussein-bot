const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'gamemode',
    description: "The base command for player rotation games in League of Legends. See `!help gamemode print`, `!help gamemode next`, and `!help gamemode refresh` for related commands.",
    params: "`[Command name]` (required)",
    category: "gamemode",
    subcommands: ["gamemode print", "gamemode next", "gamemode refresh"],
    cooldown: 3,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(args[0]==="print" || args[0]==="list"){
            let queueStr = "";
            if(message.client.gamemodes.length>0){
                for(i = 0;i < message.client.gamemodes.length;i++){
                  queueStr += (i+1) + ") " + message.client.gamemodes[i] + "\n";
                }
                message.channel.send(`Gamemode queue:\n\`\`\`${queueStr}\`\`\``);
            }
            else message.channel.send("No more gamemodes in queue.");
        }
        if(args[0]==="next"){
            if(message.client.gamemodes.length>0){
                const embed = new Discord.RichEmbed()
                  .setTitle("The next gamemode is: ")
                  .setDescription(`\`${message.client.gamemodes.shift()}\``)
                  .setColor("#fcc838");
                message.channel.send({embed: embed});
            }
            else message.channel.send("No more gamemodes in queue.");
        }
        if(args[0]==="hidn"){
            if(args.length === 2 && args[1] <= message.client.gamemodes.length){
                promote(message.client.gamemodes, args[1]);
            }
            else message.channel.send("U fucked up");
        }
        if(args[0]==="refresh"){
            refresh(message.client);
            message.channel.send("Gamemode queue refreshed.")
        }
    }
}

function promote(gamemodes, index){
  if(index <= gamemodes.length){
    gamemodes.splice(0,0, gamemodes.splice(index-1, 1));
  }
}

function refresh(client){
  const gamemodes = fs.readFileSync("./data/gamemodes.json");
  client.gamemodes = JSON.parse(gamemodes);
  randomizeArray(client.gamemodes);
}

function randomizeArray(array){
    let i = array.length;
    if(i==0) return;
    while(--i){
      let j = Math.floor(Math.random()*(i+1));
      let tempi = array[i];
      let tempj = array[j];
      array[i]= tempj;
      array[j]= tempi;
    }
}
