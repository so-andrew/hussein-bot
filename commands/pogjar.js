const Discord = require("discord.js");

exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "pogjar", message.author.username);
    let pogCount = 0;
    let pluralString = "s";
    if(!args){
      if(client.pogjar.has(message.author.id)){
          pogCount = client.pogjar.get(message.author.id);
          if(pogCount == 1) pluralString = "";
      }
      const embed = new Discord.RichEmbed()
          .setTitle("Pog Jar")
          .setDescription("You have invested " + pogCount + " pog" + pluralString + " into the pog jar!")
          .setFooter("Invoked by " + message.author.username)
          .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
          .setColor("#0fc13c");
      message.channel.send({embed: embed});
    }
    else{
      let pogQueriedUser = message.mentions.members.first();
      if(client.pogjar.has(pogQueriedUser.user.id)){
          pogCount = client.pogjar.get(pogQueriedUser.user.id);
          if(pogCount == 1) pluralString = "";
      }
      const embed = new Discord.RichEmbed()
          .setTitle("Pog Jar")
          .setDescription(pogQueriedUser.user.username + " has invested " + pogCount + " pog" + pluralString + " into the pog jar!")
          .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
          .setColor("#0fc13c");
      message.channel.send({embed: embed});
    }
};
