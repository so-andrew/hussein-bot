const games = require("../games.json");

exports.run = (client, message, args) => {
    console.log(`Command !%s received from %s`, "setgame", message.author.username);
    if (!args) {
        message.channel.send("No game specified.");
    }
    else if(args[0] == "reset"){
        //console.log(args[0]);
        setGame(client);
        client.interval = setInterval(setGame, 60000*5, client);
        console.log("Game rotation in effect.");
    }
    else {
        clearInterval(client.interval);
        client.user.setPresence({game: {name: args.join(" "), type: 0}})
            .then(() => {})
            .catch(console.log);
        message.channel.send('Changed game to **' + args.join(" ") + '**.');
        console.log("Game rotation disabled.");
    }
};

function setGame(client){
  game = randomizeGame();
  client.user.setPresence({game: {name: game, type: 0}})
      .then(() => {})
      .catch(console.log);
  console.log(`Game changed to ${game}.`);
}

function randomizeGame(){
  //console.log(games.list[0]);
  return games.list[Math.floor(Math.random() * games.list.length)];
}
