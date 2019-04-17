module.exports = {
    name: 'insult',
    description: "A Hussein-style insult generator. Takes in a user-specified ethnicity as an input.",
    params: "`String` (required)",
    exinput: "`!insult Italian`",
    exoutput: "Listen here, you greasy Italian cuck!",
    category: "fun",
    offensive: true,
    cooldown: 5,
    execute(message, args){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if (!args || !args.length) message.channel.send("I can\'t insult people without mentioning their ethnicity! (No ethnicity specified)");
        else message.channel.send(insult(args.join(" ")));
    }
}

function insult(args){
    let clientMessage;
    let uck;
    if (Math.floor(Math.random() * 10) % 2 === 0.0) uck = ' cuck!';
    else uck = ' fuck!';
    if (/Italian/i.test(args)) clientMessage = 'Listen here, you greasy ' + args + uck;
    else clientMessage = 'Listen here, you dirty ' + args + uck;
    return clientMessage;
}
