const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

client.macros = new Enmap({ provider: new EnmapLevel({ name: 'macros' }) });
client.cooldown = [];
client.disable = [];
client.interval = null;
client.gamemodes = JSON.parse(fs.readFileSync("./gamemodes.json"));
client.mode = 1;
client.pogjar = new Map(JSON.parse(fs.readFileSync("./pogjar.json")));

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.login(config.token)
    .then(() => {
      randomizeArray(client.gamemodes);
    })
    .catch(console.log);

function randomizeArray(array){
    let i = array.length;
    if(i == 0) return;
    while(--i){
      let j = Math.floor(Math.random()*(i+1));
      let tempi = array[i];
      let tempj = array[j];
      array[i]= tempj;
      array[j]= tempi;
    }
}
