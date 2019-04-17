const utils = require("./utils.js");

module.exports = {
    name: 'randomlist',
    aliases: ["randlist"],
    description: "Randomizes a given list.",
    params: "`[element 1] | [element 2] | ... | [element n]` (n > 1)",
    exinput: "`!randomList OK Computer | Kid A | In Rainbows | A Moon Shaped Pool`",
    exoutput: "```\n1) Kid A\n2) In Rainbows\n3) A Moon Shaped Pool\n4) OK Computer\n```",
    category: "utility",
    cooldown: 3,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(!args || !args.length) return message.channel.send("Command usage: `!randomlist [element 1] | [element 2] | ... | [element n]`");
        if(args.length === 1){
            if(args[0].split('|').length < 2) return message.channel.send("You think you're funny, huh?");
        }
        else if(args.join('').indexOf('|') === -1){
            return message.channel.send("Your elements are not separated by \`|\` which may lead to unexpected results. Please try again.");
        }
        let list = [];
        args.join(' ').split('|').forEach((element) => {
            if(element.trim() !== '') list.push(element.trim());
        });
        if(list.length === 0) return message.channel.send("There are no valid elements, try again.");
        list = utils.randomizeArray(list);
        let i = 1;
        let output = "```\n";
        list.forEach((element) => {
            output += `${i}) ${element}\n`;
            i++;
        });
        output += "```";
        message.channel.send(output);
    }
}
