const games = require("../data/games.json");
const viewing = require("../data/watch.json");
const listening = require("../data/listen.json");

module.exports.setPresence = (client) => {
  var choice = Math.floor(Math.random()*3);
  switch(choice){
    case 0:
      setGame(client);
      break;
    case 1:
      setWatch(client);
      break;
    case 2:
      setListen(client);
      break;
  }
}

async function setGame(client){
  game = randomize(games);
  await client.user.setPresence({game: {name: game, type: 0}});
  const d = new Date();
  let minuteString = d.getMinutes().toString();
  if(d.getMinutes() < 10) minuteString = "0" + minuteString;
  let secondString = d.getSeconds().toString();;
  if(d.getSeconds() < 10) secondString = "0" + secondString;
  console.log(`${d.getHours()}:${minuteString}:${secondString} - Currently playing ${game}.`);
}

async function setWatch(client){
  watch = randomize(viewing);
  await client.user.setPresence({game: {name: watch, type: 3}});
  const d = new Date();
  let minuteString = d.getMinutes().toString();
  if(d.getMinutes() < 10) minuteString = "0" + minuteString;
  let secondString = d.getSeconds().toString();;
  if(d.getSeconds() < 10) secondString = "0" + secondString;
  console.log(`${d.getHours()}:${minuteString}:${secondString} - Currently watching ${watch}.`);
}

async function setListen(client){
  listen = randomize(listening);
  await client.user.setPresence({game: {name: listen, type: 2}});
  const d = new Date();
  let minuteString = d.getMinutes().toString();
  if(d.getMinutes() < 10) minuteString = "0" + minuteString;
  let secondString = d.getSeconds().toString();;
  if(d.getSeconds() < 10) secondString = "0" + secondString;
  console.log(`${d.getHours()}:${minuteString}:${secondString} - Currently listening to ${listen}.`);
}

function randomize(obj){
  return obj.list[Math.floor(Math.random() * obj.list.length)];
}
