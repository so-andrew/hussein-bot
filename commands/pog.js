const fs = require("fs");
const Discord = require("discord.js");

exports.run = (client, message) => {
  let pluralString = "";
  if(client.pogjar.has(message.author.id)){
    client.pogjar.set(message.author.id, client.pogjar.get(message.author.id)+1);
    pluralString = "s";
  }
  else{
    client.pogjar.set(message.author.id, 1);
  }
  const embed = new Discord.RichEmbed()
    .setTitle("Pog Jar")
    .setDescription("You have invested " + client.pogjar.get(message.author.id) + " pog" + pluralString + " into the pog jar!")
    .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
    .setColor("#0fc13c");
    message.channel.send({embed:embed});
  fs.writeFile("./pogjar.json", JSON.stringify(Array.from(client.pogjar.entries())), function(err){
    if(err) throw err;
  });
  console.log("Pog jar updated.");
};
