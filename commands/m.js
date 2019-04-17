const urlRegex = /(http(s)?:\/\/)(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&/=]*)?/g;

const config = require("../config.json");
const Discord = require("discord.js");
const Sequelize = require("sequelize");

module.exports = {
    name: 'm',
    description: "The base command for image macros. Returns the specified image from the database, if it exists. See `!help m create`, `!help m search`, `!help m delete`, `!help m list`, `!help m edit`, and `!help m info` for other commands related to the macro feature.",
    params: "`[name]` (required)",
    category: "macros",
    subcommands: ["m", "m create", "m search", "m delete", "m list", "m edit", "m info"],
    cooldown: 3,
    async execute(message, args){
        if(!args || !args.length) return message.channel.send("Needs more parameters.");
        if(args[0] === "create"){
            //at least 3 arguments, args[1] cannot be a URL, args[2] must be a URL
            if(args.length === 3 && !urlRegex.test(args[1]) && urlRegex.test(args[2])) createMacro(message, args);
            else return message.channel.send("Command usage: `!m create [name] [link]`");
        }
        else if(args[0] === 'delete'){
            if(args.length === 2) deleteMacro(message, args[1]);
            else return message.channel.send("Command usage: `!m delete [name]`");
        }
        else if(args[0] === 'info'){
            if(args.length === 2) macroInfo(message, args[1]);
            else return message.channel.send("Command usage: `!m info [name]`");
        }
        else if(args[0] === 'edit'){
            if(args.length === 3) editMacro(message, args);
            else return message.channel.send("Command usage: `!m edit [name] [name/link]`");
        }
        else if(args[0] === 'search'){
            if(args.length === 2) searchMacro(message, args[1]);
            else return message.channel.send("Command usage: `!m search [name]`");
        }
        else if(args[0] === 'list') listMacros(message);
        else retrieveMacro(message, args[0]);
    }
}

async function createMacro(message, args){
    console.log(`Command m create received from ${message.author.username} with arguments ${args}.`)
    try{
        const macro = await message.client.macroDB.create({
            name: args[1].toLowerCase(),
            text: args[2],
            creatorID: message.author.id,
            creatorName: message.author.username,
        });
        message.channel.send(`Macro \`${macro.name}\` created.`);
        console.log(`Macro ${macro.name} created by ${message.author.username}.`);
    }
    catch(e){
        if(e.name === 'SequelizeUniqueConstraintError') return message.channel.send("This macro already exists.");
        return console.error(e);
    }
}

async function retrieveMacro(message, arg){
    const macro = await message.client.macroDB.findOne({ where: { name: arg.toLowerCase() } });
    if(macro){
        macro.increment('uses');
        console.log(`Macro ${arg.toLowerCase()} invoked by ${message.author.username}.`);
        const embed = new Discord.RichEmbed()
            .setImage(macro.get('text'))
            .setColor(3447003);
        return message.channel.send({embed: embed});
    }
    return message.channel.send("No macro with that name found.");
}

async function deleteMacro(message, arg){
    console.log(`Command m delete received from ${message.author.username} with arguments ${arg}.`);
    const macro = await message.client.macroDB.findOne({ where: { name: arg.toLowerCase() } });
    if(macro){
        if(message.author.id === macro.get('creatorID') || message.author.id === config.ownerID){
            await message.client.macroDB.destroy({ where: { name: arg } });
            return message.channel.send(`Macro \`${arg.toLowerCase()}\` deleted.`);
        }
        return message.channel.send("This is not your macro to delete!");
    }
    return message.channel.send("No such macro exists.");

}

async function macroInfo(message, arg){
    console.log(`Command m info received from ${message.author.username} with args ${arg}.`);
    const macro = await message.client.macroDB.findOne({ where: { name: arg.toLowerCase() } });
    if(macro){
        const embed = new Discord.RichEmbed()
            .setTitle(`\`${macro.get('name')}\``)
            .setDescription(macro.get('text'))
            .setColor(3447003)
            .setThumbnail(macro.get('text'))
            .addField("Creator", macro.get('creatorName'), true)
            .addField("Uses", macro.get('uses'), true);
        return message.channel.send({embed: embed});
    }
    return message.channel.send("No such macro exists.");
}

async function editMacro(message, args){
    console.log(`Command m edit received from ${message.author.username} with arguments ${args}.`)
    const macro = await message.client.macroDB.findOne({ where: { name: args[1].toLowerCase()} });
    if(macro){
        if(message.author.id === macro.get('creatorID') || message.author.id === config.ownerID){
            if(urlRegex.test(args[2])){
                // argument is a URL, editing macro text
                const rowsChanged = await message.client.macroDB.update({ text: args[2] }, { where: { name: args[1].toLowerCase() } });
                if(rowsChanged > 0){
                    console.log(`Macro ${args[1].toLowerCase()} contents changed to ${args[2]}.`);
                    return message.channel.send(`Macro \`${args[1].toLowerCase()}\` changed to \`${args[2]}\`.`);
                }
            }
            else{
                // argument is not a URL, editing mecro name
                const newMacro = await message.client.macroDB.create({
                    name: args[2].toLowerCase(),
                    text: macro.get('text'),
                    creatorID: macro.get('creatorID'),
                    creatorName: macro.get('creatorName'),
                });
                await message.client.macroDB.destroy({ where: { name: args[1].toLowerCase() } });
                console.log(`Macro ${args[1].toLowerCase()} changed to ${newMacro.name}.`);
                return message.channel.send(`Macro \`${args[1].toLowerCase()}\` changed to \`${newMacro.name}\`.`);
            }
        }
        return message.channel.send("This is not your macro to edit!");
    }
    return message.channel.send("No such macro exists.");
}

async function listMacros(message){
    console.log(`Command m list received from ${message.author.username}.`);
    const macroList = await message.client.macroDB.findAll({ attributes: ['name'] });
    const macroString = '\`' + macroList.map(m => m.name).join('\`, \`') + '\`' || 'No macros set.';
    const embed = new Discord.RichEmbed()
      .setTitle("List of Macros")
      .setDescription(macroString)
      .setColor("DARK_RED")
      .setFooter(`Number of macros: ${macroList.length}`);
    return message.channel.send({embed: embed});
}

async function searchMacro(message, arg){
  console.log(`Command m search received from ${message.author.username} with arguments ${arg}.`);
  if(arg === "?" || arg === "*" || arg === "^" || arg === "\\" || arg === "$" || arg === "+") arg = "\\" + arg;
  //const searchRegex = new RegExp(arg, "i");
  const Op = Sequelize.Op;
  const queryResults = await message.client.macroDB.findAll({ where:
    { [Op.or]: [ { name: { [Op.like]: `%${arg}` } }, { name: { [Op.like]: `${arg}%` } }, { name: { [Op.like]: `%${arg}%` } } ] } });
  if(!queryResults.length) return message.channel.send("No such macro exists.");
  const embed = new Discord.RichEmbed()
      .setTitle("You may be looking for: ")
      .setDescription('\`' + queryResults.map(m => m.name).join('\`, \`') + '\`')
      .setColor("DARK_BLUE");
  return message.channel.send({embed: embed});
}
