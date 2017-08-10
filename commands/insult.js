exports.run = (client, message, args) => {

    console.log(`Command !%s received from %s`, "insult", message.author.username);
    if (!args) {
        message.channel.send("I can\'t insult people without mentioning their ethnicity! (No ethnicity specified)");
    }
    else {
        let clientMessage = insult(args.join(" "));
        message.channel.send(clientMessage);
    }
};

function insult(args){
    let clientMessage;
    let uck;
    if (Math.floor(Math.random() * 10) % 2 === 0.0) {
        uck = ' cuck!';
    }
    else {
        uck = ' fuck!';
    }
    if (/Italian/i.test(args)) {
        clientMessage = 'Listen here, you greasy ' + args + uck;
    }
    else {
        clientMessage = 'Listen here, you dirty ' + args + uck;
    }
    return clientMessage;
}