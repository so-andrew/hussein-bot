// Importing required modules
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const config = require("./config.json");
const utils = require("./commands/utils.js");
const Sequelize = require("sequelize");

// Properties of client, useful to keep track of state
client.disable = new Discord.Collection();
client.presenceInterval = null;
client.twitchCheckInterval = null;
client.gamemodes = JSON.parse(fs.readFileSync("./data/gamemodes.json"));
client.pogjar = new Discord.Collection(JSON.parse(fs.readFileSync("./data/pogjar.json")));
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.twitchGames = new Discord.Collection(JSON.parse(fs.readFileSync("./data/twitchgames.json")));
client.guildPrefs = new Discord.Collection();
client.macros = new Discord.Collection();
client.coins = [];
client.latenight = false;

// Initializing guild preference files
const guildPrefFiles = fs.readdirSync('./data/guilds').filter(file => file.endsWith('json'));
for(const file of guildPrefFiles){
    const guildPrefs = JSON.parse(fs.readFileSync(`./data/guilds/${file}`));
    client.guildPrefs.set(guildPrefs.id, guildPrefs);
}

// Initializing macro databases
for(let [key, value] of client.guildPrefs){
    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: `./data/macros/${key}.sqlite`,
    });
    const macroDB = sequelize.define('macros', {
        name: { type: Sequelize.STRING, unique: true, },
        text: Sequelize.TEXT,
        creatorID: Sequelize.STRING,
        creatorName: Sequelize.STRING,
        uses: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false, },
    });
    client.macros.set(key, macroDB);
}

// Initializing event handlers
fs.readdir("./events/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

// Initialiizing command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Initializing coin imades for coinflip command
const coinFiles = fs.readdirSync('./resources/coins').filter(file => file.endsWith('.png'));
for(const file of coinFiles){
    client.coins.push(`${file.substring(0, file.indexOf('.'))}`);
}

// Login to Discord
client.login(config.token)
    .then(() => {
        client.gamemodes = utils.randomizeArray(client.gamemodes);
        client.coins = utils.randomizeArray(client.coins);
    }).catch((error) => {
        console.log(error);
    });

// Receive pings to keep alive
app.get("/", (request, response) => {
    console.log(`${utils.currentTime()} - Ping received.`);
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
