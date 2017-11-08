const Discord = require("discord.js");
const fs = require("fs");

exports.run = (client, message, args) => {
  console.log("Command !%s received from %s", "gamemode", message.author.username);
  //console.log(client.gamemodes);
  if(args[0]==="print"){
    let queueStr = "";
    if(client.gamemodes.length>0){
      for(i = 0;i<client.gamemodes.length;i++){
        queueStr += (i+1) +") " + client.gamemodes[i] + "\n";
      }
      message.channel.send(`Gamemode queue:\n\n\`\`\`${queueStr}\`\`\``);
    }
    else message.channel.send("No more gamemodes in queue.");
  }
  if(args[0]==="next"){
    if(client.gamemodes.length>0){
      const embed = new Discord.RichEmbed()
        .setTitle("The next gamemode is: ")
        .setDescription(`\`${client.gamemodes.shift()}\``)
        .setColor("#fcc838");
      message.channel.send({embed: embed});
    }
    else message.channel.send("No more gamemodes in queue.");
    //message.channel.send(`The next gamemode is **${client.gamemodes.shift()}**`);
  }
  if(args[0]==="hidn"){
    if(args.length === 2){
      promote(client.gamemodes, args[1]);
    }
    else message.channel.send("U fucked up");
  }
  if(args[0]==="refresh"){
    refresh(client);
    message.channel.send("Gamemode queue refreshed.")
  }
};

function promote(gamemodes, index){
  gamemodes.splice(0,0, gamemodes.splice(index-1, 1));
}

function refresh(client){
  const gamemodes = fs.readFileSync("./gamemodes.json");
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
