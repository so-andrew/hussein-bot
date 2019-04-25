const Discord = require("discord.js");

module.exports = {
    name: 'pogjar',
    description: "Checks the amount of pogs that the user (or a mentioned user) has placed into the pog jar.",
    params: "`@mention` (optional)",
    category: "fun",
    cooldown: 5,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        let pogCount = 0;
        let pluralString = "s";
        if(args[0] === "top"){
            const pogjar = message.client.pogjar.clone();
            console.log(pogjar);
            let pogjarsort = pogjar.sort((a, b) => {
              console.log("a = " + a + ", b = " + b);
              return b - a;
            });
            console.log(pogjarsort);
            let i = 1;
            let output = "";
            for(const [key, value] of pogjarsort){
                if(!message.guild) return message.channel.send("Not implemented yet.");
                if(message.guild.members.has(key)){
                    //console.log(`${i}) ${message.guild.members.get(key).user} - ${value} pogs`);
                    output += `${i}) ${message.guild.members.get(key).user} - ${value} pogs\n`;
                    i++;
                }
            }
            const embed = new Discord.RichEmbed()
                .setTitle("Pog Jar Leaderboard")
                .setDescription(output)
                .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
                .setColor("#0fc13c");
            return message.channel.send({ embed: embed });
        }
        if(!args || !args.length){
            if(message.client.pogjar.has(message.author.id)){
                pogCount = message.client.pogjar.get(message.author.id);
                if(pogCount == 1) pluralString = "";
            }
            const embed = new Discord.RichEmbed()
                .setTitle("Pog Jar")
                .setDescription("You have invested " + pogCount + " pog" + pluralString + " into the pog jar!")
                .setFooter("Invoked by " + message.author.username)
                .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
                .setColor("#0fc13c");
            return message.channel.send({ embed: embed });
        }
        else{
            let pogQueriedUser = message.mentions.members.first();
            if(!pogQueriedUser) return message.channel.send("Invalid user mention, try again.");
            if(message.client.pogjar.has(pogQueriedUser.user.id)){
                pogCount = message.client.pogjar.get(pogQueriedUser.user.id);
                if(pogCount == 1) pluralString = "";
            }
            const embed = new Discord.RichEmbed()
                .setTitle("Pog Jar")
                .setDescription(pogQueriedUser.user.username + " has invested " + pogCount + " pog" + pluralString + " into the pog jar!")
                .setThumbnail("https://i.imgur.com/vXDthSy.jpg")
                .setColor("#0fc13c");
            return message.channel.send({embed: embed});
        }
    }
}
