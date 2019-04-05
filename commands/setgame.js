const games = require("../data/games.json");

module.exports = {
    name: 'setgame',
    description: "Sets Hussein Bot's presence on Discord (shown in the member list).",
    cooldown: 5,
    execute(message, args){
        console.log(`Command !%s received from %s`, "setgame", message.author.username);
        if (!args || !args.length) message.channel.send("No game specified.");
        else if(args[0] == "reset"){
            setGame(message.client);
            clearInterval(message.client.interval);
            message.channel.client.interval = setInterval(setGame, 60000*5, message.client);
            console.log("Game rotation in effect.");
        }
        else {
            clearInterval(message.client.interval);
            message.client.user.setPresence({game: {name: args.join(" "), type: 0}})
                .then(() => {})
                .catch(console.log);
            message.channel.send('Changed game to **' + args.join(" ") + '**.');
            console.log("Game rotation disabled.");
        }
    }
}

function setGame(client){
    game = randomizeGame();
    client.user.setPresence({game: {name: game, type: 0}})
        .then(() => {})
        .catch(console.log);
    console.log(`Game changed to ${game}.`);
}

function randomizeGame(){
    return games.list[Math.floor(Math.random() * games.list.length)];
}
