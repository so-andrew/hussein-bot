const twitchRegex = /(http(s)?:\/\/)(www.)?(twitch.tv\/(?<name>[\w]+))/g;
const Discord = require(`discord.js`);
const fs = require('fs');
const config = require('../config.json');
const axios = require('axios');

module.exports = {
    name: 'addtwitch',
    aliases: ['twitchadd', 'addstream'],
    description: "Adds a Twitch streamer to the tracker, allowing for notifications whenever he/she streams.",
    params: "`[username / URL]` (required)",
    category: "twitch",
    cooldown: 3,
    async execute(message, args){
        if(!message.guild) return message.channel.send("Must be used in a guild text channel.");
        console.log(`Command ${module.exports.name} received from ${message.author.username} in ${message.guild.name} with arguments ${args}.`);
        if(!args || !args.length) return message.channel.send("Not enough parameters.");
        const streamers = loadStreamers(message.guild);
        if(twitchRegex.test(args[0])){
            // Argument is a URL, extract username
            const username = args[0].substring(args[0].lastIndexOf('/')+1, args[0].length);
            console.log(`Checking for streamer with username ${username}...`);
            // Check if streamer is already being monitored
            if(streamers.has(username)) return message.channel.send(`Notifications are already on for ${username}.`);
            else{
                // Create new Streamer object to write to /data/streamers
                const streamer = new Streamer(username);
                message.channel.send(`Fetching data for streamer \`${username}\`...`);
                Promise.all([streamer.fetchIcon(), streamer.fetchID()]).then(()=>{
                    fs.writeFileSync(`./data/streamers/${message.guild.id}/${username}.json`, JSON.stringify(streamer));
                    console.log(`Streamer notifications for ${username} are now on.`);
                    return message.channel.send(`Notifications are now on for \`${username}\`.`);
              });
            }
        }
        else{
            // Argument is probably a username
            const username = args[0];
            if(streamers.has(username)) return message.channel.send(`Notifications are already on for ${username}.`);
            else{
                // Check with Twitch API to see if argument is a valid username
                message.channel.send(`Fetching data for streamer \`${username}\`...`);
                const user = await getUser(username);
                if(!user) return message.channel.send("No such user exists.");
                // Create new Streamer object to write to /data/<guild.id>/streamers
                const streamer = new Streamer(username);
                streamer.setID(user.id);
                streamer.setIcon(user.profile_image_url);
                fs.writeFileSync(`./data/streamers/${message.guild.id}/${username}.json`, JSON.stringify(streamer));
                console.log(`Streamer notifications for ${username} are now on.`);
                return message.channel.send(`Notifications are now on for \`${username}\`.`);
            }
        }
    }
}

class Streamer {

    constructor(name){
        this.username = name;
        this.user_id = null;
        this.liveTime = null;
        this.icon = null;
    }

    setIcon(icon){
        this.icon = icon;
    }

    setID(id){
        this.user_id = id;
    }

    async fetchIcon(){
        try{
            const result = await axios.get(`https://api.twitch.tv/helix/users?login=${this.username}`, {
                headers: {
                    'Client-ID': config.twitchClientID,
                }
            });
            this.icon = result.data.data[0].profile_image_url;
            return this.icon;
        }
        catch(error){
            console.error(error);
        }
    }

    async fetchID(){
        try{
            const result = await axios.get(`https://api.twitch.tv/helix/users?login=${this.username}`, {
                headers: {
                    'Client-ID': config.twitchClientID,
                }
            });
            this.user_id = result.data.data[0].id;
            return this.icon;
        }
        catch(error){
            console.error(error);
        }
    }
}

async function getIcon(name){
    try{
        const result = await axios.get(`https://api.twitch.tv/helix/users?login=${name}`, {
            headers: {
                'Client-ID': config.twitchClientID,
            }
        });
        const iconURL = result.data.data[0].profile_image_url;
        return iconURL;
    }
    catch(error){
        console.error(error);
    }
}

async function getID(name){
    try{
        const result = await axios.get(`https://api.twitch.tv/helix/users?login=${name}`, {
            headers: {
                'Client-ID': config.twitchClientID,
            }
        });
        const iconURL = result.data.data[0].id;
        return iconURL;
    }
    catch(error){
        console.error(error);
    }
}

async function getUser(name){
    try{
         const result = await axios.get(`https://api.twitch.tv/helix/users?login=${name}`, {
             headers: {
                 'Client-ID': config.twitchClientID,
             }
         });
         return result.data.data[0];
    }
    catch(error){
        console.error(error);
    }
}

// Loads all streamer JSON files in the /data/streamers directory into a new Collection for use
function loadStreamers(guild){
    let streamers = new Discord.Collection();
    const streamerFiles = fs.readdirSync(`./data/streamers/${guild.id}`).filter(file => file.endsWith('.json'));
    for(const file of streamerFiles){
        let streamer = JSON.parse(fs.readFileSync(`./data/streamers/${guild.id}/${file}`));
        streamers.set(streamer.username, streamer);
    }
    return streamers;
}
