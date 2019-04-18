const fs = require('fs');
const Discord = require('discord.js');

// TODO: Add more preference options (e.g. restrict to certain channel)

module.exports = {
    name: "config",
    description: "Initializes the per-guild settings for Hussein Bot, including the default Twitch notification channel and the prefix.",
    params: "User must have \"Manage Server\" permission.",
    privileged: true,
    category: "mod",
    cooldown: 2,
    async execute(message, args){
        if(message.channel.type !== "text") return message.channel.send("Must be used in a guild text channel.");
        console.log(`Command ${module.exports.name} received from ${message.author.username} in ${message.guild.name}.`);
        if(!args || !args.length){
            if(message.member.hasPermission("MANAGE_GUILD")){
                try{
                    fs.readFileSync(`./data/guilds/${message.guild.id}.json`);
                    message.channel.send("A preference file for this guild already exists, would you like to recreate it? (Y/N)\n\n*To change a single property (such as the bot's prefix), consider using the commands `!setprefix` or `!settwitch` instead.*");
                    const filter = m => m.author.id === message.author.id;
                    const collected = await message.channel.awaitMessages(filter, {max:1, time:15000});
                    if(collected.size === 0 || collected.first().content.toLowerCase() !== "y"){
                        const filter = m => m.author.id === message.client.user.id;
                        const collected = await message.channel.awaitMessages(filter, {max:1, time:1000});
                        //console.log(collected);
                        if(collected.size !== 0 && collected.first().content.toLowerCase() === "i"){
                            return collected.first().edit("Exiting configuration mode.");
                        }
                        else return message.channel.send("Exiting configuration mode.");
                    }
                }
                catch(error){
                    console.error(error);
                    console.log("Preference file does not exist, creating one now...");
                }
                let guildPrefs = new GuildPrefs(message.guild);
                message.channel.send("What channel would you like Twitch live notifications to appear in? (use \`#channel-name\`)\n\n*This message will expire in 15 seconds...*");
                let channelComplete = false;
                let loopCount = 0;
                while(!channelComplete){
                    const filter = m => m.author.id === message.author.id;
                    const collected = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
                    // If no response, end call to command
                    if(collected.size === 0) return message.channel.send("No response, eh?");
                    // Check if channel is mentioned, if not => loop until channel is mentioned or until number of loops >= 3
                    if(collected.first().mentions.channels.size !== 0){
                        const channel = collected.first().mentions.channels.first();
                        if(channel.type !== "text") message.channel.send("This is not a valid text channel, please try again.");
                        else{
                            guildPrefs.setTwitchNotificationChannel(channel);
                            channelComplete = true;
                            break;
                        }
                    }
                    else loopCount++;
                    if(loopCount >= 3){
                        return message.channel.send("Too many invalid responses, please invoke `!config` again.");
                    }
                    else message.channel.send("No channels mentioned in your response, try again.");
                }
                message.channel.send("Would you like me to create a role that will be pinged when a streamer goes live? (Y/N)\n\n*This message will expire in 15 seconds...*");
                let roleComplete = false;
                loopCount = 0;
                while(!roleComplete){
                    const filter = m => m.author.id === message.author.id;
                    const collected = await message.channel.awaitMessages(filter, {max: 1, time: 15000});
                    // If no response, end call to command
                    if(collected.size === 0) return message.channel.send("No response, eh?");
                    if(collected.first().content.toLowerCase() === "y"){
                        const roleExists = await message.guild.roles.find(role => role.name === 'Notification Squad');
                        if(!roleExists){
                            const role = await message.guild.createRole({
                                name: 'Notification Squad',
                                color: 'GREEN',
                            });
                            role.setMentionable(true);
                            guildPrefs.setNotificationRole(role);
                        }
                        else{
                            message.channel.send("Role with name Notification Squad exists, will use that role for now. If this is not desired, use `!settwitchrole` to specify a different role.");
                            guildPrefs.setNotificationRole(roleExists);
                        }
                        roleComplete = true;
                        break;
                    }
                    else if(collected.first().content.toLowerCase() === "n"){
                        message.channel.send("Okay. You can always create or assign a role later with `!settwitchrole`.");
                        roleComplete = true;
                        break;
                    }
                    else loopCount++;
                    if(loopCount >= 3){
                        return message.channel.send("Too many invalid responses, please invoke `!config` again.");
                    }
                    else message.channel.send("Please enter Y or N.");
                }
                message.channel.send("What prefix would you like to use for the server? (default is `!`, max length is 7)\n\n*This message will expire in 15 seconds...*");
                let prefixComplete = false;
                loopCount = 0;
                while(!prefixComplete){
                    const filter = m => m.author.id === message.author.id;
                    const collected = await message.channel.awaitMessages(filter, {max:1, time: 15000});
                    // If no response, end call to command
                    if(collected.size === 0) return message.channel.send("No response, eh?");
                    // Check if valid prefix if offered, if not => loop until valid prefix or until number of loops >= 3
                    if(collected.first().content.length <= 7){
                        guildPrefs.setPrefix(collected.first().content);
                        prefixComplete = true;
                        break;
                    }
                    else loopCount++;
                    if(loopCount >= 3){
                        return message.channel.send("Too many invalid responses, please invoke `!config` again.");
                    }
                    else message.channel.send("Prefix is too long, try again.");
                }
                message.channel.send("Would you like to allow offensive commands in this server? (Y/N)\n\n*This message will expire in 15 seconds...*");
                let offensiveComplete = false;
                loopCount = 0;
                while(!offensiveComplete){
                    const filter = m => m.author.id === message.author.id;
                    const collected = await message.channel.awaitMessages(filter, {max:1, time:15000});
                    if(collected.size === 0) return message.channel.send("No response, eh?");
                    if(collected.first().content.toLowerCase() === "y"){
                        guildPrefs.setOffensive(true);
                        offensiveComplete = true;
                        break;
                    }
                    else if(collected.first().content.toLowerCase() === "n"){
                        offensiveComplete = true;
                        break;
                    }
                    else loopCount++;
                    if(loopCount >= 3){
                        return message.channel.send("Too many invalid responses, please invoke `!config` again.");
                    }
                    else message.channel.send("Please enter Y or N.");
                }
                try{
                    fs.writeFileSync(`./data/guilds/${message.guild.id}.json`, JSON.stringify(guildPrefs));
                    message.client.guildPrefs.set(guildPrefs.id, guildPrefs);
                    const embed = new Discord.RichEmbed()
                        .setTitle(`**Preferences for ${message.guild.name}**`)
                        .setDescription("Preference file successfully created.")
                        .addField("Prefix", `${guildPrefs.prefix}`, true)
                        .addField("Twitch Notification Channel", `<#${guildPrefs.twitchNotificationChannel}>`, true)
                        .addField("Twitch Notification Role", message.guild.roles.get(guildPrefs.notificationRole).name)
                        .addField("Offensive Commands Allowed", guildPrefs.offensive, true)
                        .setThumbnail(message.guild.iconURL)
                        .setColor("BLUE");
                    return message.channel.send({embed:embed});
                }
                catch(error){
                    return message.channel.send("There was a problem creating your preference file.");
                }
          }
          else return message.channel.send("You do not have the proper permissions to use this command.");
      }
      else if(args[0] === "print"){
          try{
              const guildPrefs = JSON.parse(fs.readFileSync(`./data/guilds/${message.guild.id}.json`));
              const embed = new Discord.RichEmbed()
                  .setTitle(`**Preferences for ${message.guild.name}**`)
                  .setDescription("Preference file successfully retrieved.")
                  .addField("Prefix", `${guildPrefs.prefix}`, true)
                  .addField("Twitch Notification Channel", `<#${guildPrefs.twitchNotificationChannel}>`, true)
                  .addField("Twitch Notification Role", message.guild.roles.get(guildPrefs.notificationRole).name)
                  .addField("Offensive Commands Allowed", guildPrefs.offensive, true)
                  .setThumbnail(message.guild.iconURL)
                  .setColor("BLUE");
              return message.channel.send({embed:embed});
          }
          catch(error){
              console.error(error);
              console.log("Preference file does not exist.");
              return message.channel.send("No preference file exists for this guild.");
          }
      }
      else return message.channel.send("Invalid parameters.");
    }
}

class GuildPrefs {
    constructor(guild){
        this.id = guild.id;
        this.name = guild.name;
        this.twitchNotificationChannel = null;
        this.prefix = "!";
        this.offensive = false;
        this.notificationRole = null;
    }

    setTwitchNotificationChannel(channel){
        this.twitchNotificationChannel = channel.id;
    }

    setNotificationRole(role){
        this.notificationRole = role.id;
    }

    setOffensive(boolean){
        this.offensive = boolean;
    }

    setPrefix(string){
        if(string || string.length) this.prefix = string;
        else console.log(`Attempt to assign invalid prefix string to ${this.name}.`);
    }
}
