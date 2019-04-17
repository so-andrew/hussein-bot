const helpJSON = require('../data/help.json');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: "Help function",
    execute(message, args){
        //fetchHelpJSON();
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        const guilds = loadGuilds();
        let offensive = false;
        if(message.guild && guilds.has(message.guild.id)) offensive = guilds.get(message.guild.id).offensive;
        if(!args || !args.length){
            const commandsWithCategory = message.client.commands.filter(command => command.category);
            const commandCategories = new Discord.Collection();
            const funCommands = commandsWithCategory.filter(command => command.category === "fun");
            commandCategories.set("Fun Commands", funCommands);
            const utilityCommands = commandsWithCategory.filter(command => command.category === "utility");
            commandCategories.set("Utility Commands", utilityCommands);
            const modCommands = commandsWithCategory.filter(command => command.category === "mod");
            commandCategories.set("Mod Commands", modCommands);
            const noveltyCommands = commandsWithCategory.filter(command => command.category === "novelty");
            commandCategories.set("Novelty Commands", noveltyCommands);
            const macroCommands = commandsWithCategory.filter(command => command.category === "macros");
            commandCategories.set("User Macro System", macroCommands);
            const gamemodeCommands = commandsWithCategory.filter(command => command.category === "gamemode");
            commandCategories.set("League Player Rotation", gamemodeCommands);
            const twitchCommands = commandsWithCategory.filter(command => command.category === "twitch");
            commandCategories.set("Twitch Notifications", twitchCommands);

            if(!offensive){
                funCommands.sweep(command => command.offensive);
                utilityCommands.sweep(command => command.offensive);
                noveltyCommands.sweep(command => command.offensive);
            }

            const embed = new Discord.RichEmbed()
                .setTitle("Commands")
                .setColor(3447003)
                .setDescription("An index of commands currently supported by Hussein Bot.")
                .setFooter("Type !help [command] for more info on a specific command.");

            for(let [key, value] of commandCategories){
                if(value.first().subcommands && value.first().subcommands.length !== 0){
                    const commandString = "\`" + value.first().subcommands.join("\`, \`") + "\`";
                    embed.addField(key, commandString);
                }
                else{
                    const keys = Array.from(value.keys());
                    const keyString = "\`" + keys.join("\`, \`") + "\`";
                    embed.addField(key, keyString);
                }
            }
            message.channel.send({embed:embed});
        }
        else help(message, args);
    }
}

function fetchHelpJSON(){
    const helpFile = new Discord.Collection();
    try{
        delete require.cache[require.resolve(`../data/help.json`)];
    }
    catch(error){
        console.error(error);
    }
    for(let key in helpJSON){
        helpFile.set(key, helpJSON[key]);
    }
    return helpFile;
}

function help(message, args){
    if(args[0] === "m" || args[0] === "gamemode"){
        const command = message.client.commands.get(args[0]);
        const joinedArgs = args.join(" ");
        if(command.subcommands.includes(joinedArgs)){
            const helpFiles = fetchHelpJSON();
            const help = helpFiles.get(joinedArgs);
            let prefix = "!"
            if(message.guild) prefix = message.client.guildPrefs.get(message.client.guild.id).prefix;
            const embed = new Discord.RichEmbed()
                .setTitle(`\`${prefix}${help.name}\``)
                .setColor(3447003)
                .setDescription(`${help.desc}`);
            if(help.params) embed.addField("Parameters", help.params);
            else embed.addField("Parameters", "None");
            if(help.exinput) embed.addField("Sample Input", help.exinput);
            if(help.exoutput) embed.addField("Sample Output", help.exoutput);
            return message.channel.send({embed:embed});
        }
        else return message.channel.send("No such command exists.");
    }
    else if(message.client.commands.has(args[0])){
        const command = message.client.commands.get(args[0]);
        let prefix = "!"
        if(message.guild) prefix = message.client.guildPrefs.get(message.guild.id).prefix;
        const embed = new Discord.RichEmbed()
            .setTitle(`\`${prefix}${command.name}\``)
            .setColor(3447003)
            .setDescription(`${command.description}`);
        if(command.params) embed.addField("Parameters", command.params);
        else embed.addField("Parameters", "None");
        if(command.aliases) embed.addField("Aliases", "\`" + command.aliases.join("\`, \`") + "\`")
        if(command.exinput) embed.addField("Sample Input", command.exinput);
        if(command.exoutput) embed.addField("Sample Output", command.exoutput);
        return message.channel.send({embed:embed});
    }
    else return message.channel.send("No such command exists.");
}

function helpOld(message, args){
    if(helpFile.has(args[0])){
        let cmdHelp;
        if((args[0] === "m" || args[0] === "gamemode") && args[1]) cmdHelp = helpFile.get(args.join(" "));
        else cmdHelp = helpFile.get(args[0]);
        let embed;
        if (cmdHelp.type === "function"){
            embed = new Discord.RichEmbed()
                .setTitle(`\`!${cmdHelp.name}\``)
                .setColor(3447003)
                .setDescription(cmdHelp.desc)
                .addField("Parameters", cmdHelp.params)
                .addField("Sample Input", cmdHelp.exinput)
                .addField("Sample Output", cmdHelp.exoutput);
        }
        else if (cmdHelp.type === "macro"){
            embed = new Discord.RichEmbed()
                .setTitle(`\`!${cmdHelp.name}\``)
                .setColor(3447003)
                .setDescription(cmdHelp.desc)
                .addField("Parameters", cmdHelp.params);
        }
        message.channel.send({embed: embed});
    }
    else message.channel.send("No such command exists.");
}

function loadGuilds(){
    let guildsWithPrefs = new Discord.Collection();
    const guildFiles = fs.readdirSync('./data/guilds').filter(file => file.endsWith('.json'));
    for(const file of guildFiles){
        let guild = JSON.parse(fs.readFileSync(`./data/guilds/${file}`));
        guildsWithPrefs.set(guild.id, guild);
    }
    return guildsWithPrefs;
}
