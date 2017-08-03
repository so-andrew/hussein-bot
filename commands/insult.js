exports.run = (client, message, args) => {

    console.log(`Command !%s received from %s`, "insult", message.author.username);
    if (args === null) {
        message.channel.send("I can\'t insult people without mentioning their ethnicity! (No ethnicity specified)");
    }
    else {
        let clientmessage = insult(args);
        message.channel.send(clientmessage);
    }
};

function insult(args){
    let clientmessage;
    let uck;
    if (Math.floor(Math.random() * 10) % 2 === 0.0) {
        uck = ' cuck!';
    }
    else {
        uck = ' fuck!';
    }
    if (/Italian/i.test(args)) {
        clientmessage = 'Listen here, you greasy ' + args + uck;
    }
    else {
        clientmessage = 'Listen here, you dirty ' + args + uck;
    }
    return clientmessage;
}