const logger = require('winston');
const presence = require("../commands/presence.js");
const twitch = require("../commands/twitch.js");
const  = require("../commands/uti
//const webhook = require("../commands/webhook.js");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {colorize: true});
logger.level = 'debug';

exports.run = (client) => {
    logger.info("Connected");
    logger.info("Logged in as : ");
    logger.info(`${client.user.username} - (${client.user.id})`);
    presence.setPresence(client);
    twitch.twitchCheck(client);
    //webhook.subscribe(client);
    try{
        for(const value of client.macros.values()){
            value.sync();
        }
        clearInterval(client.presenceInterval);
        clearInterval(client.twitchCheckInterval);
        clearInterval(client.sweepInterval);
        client.presenceInterval = setInterval(presence.setPresence, 60000*5, client);
        client.sweepInterval = setInterval(
        const d = new Date();
        if(d.getTimezoneOffset() === 0) d.setHours(d.getHours() - 4);
        if(d.getHours() > 3 && d.getHours() < 10 && !client.latenight){
            clearInterval(client.twitchCheckInterval);
            client.twitchCheckInterval = setInterval(twitch.twitchCheck, 60000*30, client);
            client.latenight = true;
            console.log("Late night protocol activated.");
        }
        else{
            client.twitchCheckInterval = setInterval(twitch.twitchCheck, 60000*3, client);
            client.latenight = false;
        }
    }
    catch(error){
        console.error(error);
    }
};
