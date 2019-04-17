const games = require("../data/games.json");
const viewing = require("../data/watch.json");
const listening = require("../data/listen.json");
const utils = require('./utils.js');

module.exports.setPresence = (client) => {
    const choice = Math.floor(Math.random()*3);
    switch(choice){
        case 0:
            // Set presence to "Playing x"
            setGame(client);
            break;
        case 1:
            // Set presence to "Watching x"
            setWatch(client);
            break;
        case 2:
            // Set presence to "Listening to x"
            setListen(client);
            break;
    }
}

// Set presence to "Playing x"
async function setGame(client){
  const game = randomElement(games);
  await client.user.setPresence({game: {name: game, type: 0}});
  console.log(`${utils.currentTime()} - Currently playing ${game}.`);
}

// Set presence to "Watching x"
async function setWatch(client){
  const watch = randomElement(viewing);
  await client.user.setPresence({game: {name: watch, type: 3}});
  console.log(`${utils.currentTime()} - Currently watching ${watch}.`);
}

// Set presence to "Listening to x"
async function setListen(client){
  const listen = randomElement(listening);
  await client.user.setPresence({game: {name: listen, type: 2}});
  console.log(`${utils.currentTime()} - Currently listening to ${listen}.`);
}

// Returns random element from given list that is part of an object
function randomElement(obj){
  return obj.list[Math.floor(Math.random() * obj.list.length)];
}
