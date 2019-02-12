const logger = require('winston');
const games = require("../games.json");
const viewing = require("../watch.json");
const listening = require("../listen.json");

// noinspection Annotator
logger.remove(logger.transports.Console);
// noinspection Annotator
logger.add(logger.transports.Console, {colorize: true});
logger.level = 'debug';

exports.run = (client) => {
  // noinspection Annotator
  logger.info("Connected");
  // noinspection Annotator
  logger.info("Logged in as : ");
  // noinspection Annotator
  logger.info(`${client.user.username} - (${client.user.id})`);
  /*client.user.setAvatar('./resources/hussein.png')
    .then(() => {})
    .catch(console.error);
    */
  setPresence(client);
  client.interval = setInterval(setPresence, 60000*5, client);
};

function setPresence(client){
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

function setGame(client){
  game = randomize(games);
  client.user.setPresence({game: {name: game, type: 0}})
      .then(() =>{})
      .catch(console.log);
  console.log(`Currently playing ${game}.`);
}

function setWatch(client){
  watch = randomize(viewing);
  client.user.setPresence({game: {name: watch, type: 3}})
      .then(() =>{})
      .catch(console.log);
  console.log(`Currently watching ${watch}.`);
}

function setListen(client){
  listen = randomize(listening);
  client.user.setPresence({game: {name: listen, type: 2}})
      .then(() =>{})
      .catch(console.log);
  console.log(`Currently listening to ${listen}.`);
}

function randomize(obj){
  return obj.list[Math.floor(Math.random() * obj.list.length)];
}
