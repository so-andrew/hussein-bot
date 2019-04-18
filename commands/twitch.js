const config = require('../config.json');
const Discord = require('discord.js');
const Vibrant = require('node-vibrant');
const axios = require('axios');
const fs = require('fs');
const utils = require('./utils.js');

module.exports.twitchCheck = (client) => {
    console.log(`${utils.currentTime()} - Checking for Twitch streams...`);
    const guilds = loadGuilds(); // Load all guilds with preference files
    guilds.forEach((guild) => {
        let streamers = new Discord.Collection();
        // Load streamers in /data/streamers/<guild.id>
        try{
            const streamerFiles = fs.readdirSync(`./data/streamers/${guild.id}`).filter(file => file.endsWith('.json'));
            for(const file of streamerFiles){
                try{
                    let streamer = JSON.parse(fs.readFileSync(`./data/streamers/${guild.id}/${file}`));
                    streamers.set(streamer.username, streamer);
                }
                catch(error){
                    console.error(error);
                }
            }
            // Check if streamer is live, notify if true
            streamers.forEach((streamer) => {
                setTimeout(request, 3000, client, streamer, guild);
            });
        }
        catch(error){
            console.error(error);
            // Directory does not exist for guild -> create it
            fs.mkdirSync(`./data/streamers/${guild.id}`);
        }
    });
    console.log(`${utils.currentTime()} - Check completed.`);
    const d = new Date();
    // Late night protocol
    if(d.getHours() > 3 && d.getHours() < 10 && !client.latenight){
        clearInterval(client.twitchCheckInterval);
        client.twitchCheckInterval = setInterval(module.exports.twitchCheck, 60000*30, client);
        client.latenight = true;
        console.log("Late night protocol activated.");
    }
    else client.latenight = false;
}

async function request(client, streamer, guild){
    let liveTime = (new Date).getTime();
    let lastLiveTime = streamer.liveTime;
    // Check if more than a half hour has passed since user was last live
    if(liveTime - lastLiveTime >= 1800000){
        try{
            // Get stream information from Twitch API
            const result = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${streamer.username}`, {
                headers: { 'Client-ID': config.twitchClientID }
            });
            const stream = result.data.data[0];
            if(stream){
                // Stream is currently live
                const d = new Date();
                liveTime = d.getTime();
                let streamStartTime = new Date(stream.started_at).getTime();
                // If user has been live for less than 30 minutes, notify
                if(liveTime - streamStartTime < 1800000){
                    let channel = client.guilds.get(`${guild.id}`).channels.get(`${guild.twitchNotificationChannel}`); // Should be extensible to all guilds eventually
                    let gameString = "";
                    // If game name is not cached, fetch name of game from Twitch API (not in provided stream info somehow)
                    if(!client.twitchGames.has(`${stream.game_id}`)){
                        gameString = await gameLookup(stream.game_id);
                        client.twitchGames.set(`${stream.game_id}`, gameString);
                        fs.writeFileSync('./data/twitchgames.json', JSON.stringify(Array.from(client.twitchGames.entries())));
                    }
                    else gameString = client.twitchGames.get(`${stream.game_id}`);
                    // Send message to channel (again, should be extensible later)
                    let v = new Vibrant(streamer.icon);
                    const palette = await v.getPalette();
                    const embed = new Discord.RichEmbed()
                        .setTitle(`**${streamer.username} has gone live!**`)
                        .setDescription(stream.title)
                        .addField("Playing", gameString, true)
                        .addField("URL", `https://www.twitch.com/${streamer.username}`)
                        .setThumbnail(streamer.icon)
                        .setColor(palette["Vibrant"].getRgb())
                        .setFooter(`${d.toLocaleString('en-US')} - Type !toggletwitch to stop receiving notifications`);
                    const sentMessage = await channel.send({ embed: embed });
                    console.log(`${utils.currentTime()} - Streamer ${streamer.username} is now live playing ${gameString}.`);
                    // Special handling for certain users (can be extensible based on properties stored in JSON)
                    if(streamer.username === "cyn0va"){
                        try{
                            sentMessage.react(sentMessage.guild.emojis.find(emoji => emoji.name === "ResidentSleeper"));
                        }
                        catch(error){
                            console.log(`Emote ResidentSleeper does not exist in ${sentMessage.guild.name}.`);
                        }
                    }
                    if(streamer.username === "sarinda251"){
                        try{
                            sentMessage.react(sentMessage.guild.emojis.find(emoji => emoji.name === "unfinished"));
                        }
                        catch(error){
                            console.log(`Emote unfinished does not exist in ${sentMessage.guild.name}.`);
                        }
                    }
                    // Set time last live to current time, write to file
                    streamer.liveTime = liveTime;
                    fs.writeFileSync(`./data/streamers/${guild.id}/${streamer.username}.json`, JSON.stringify(streamer));
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }
}

// Looks up name of game from Twitch API given its game ID
async function gameLookup(id){
    console.log(`Looking up game with id ${id}.`);
    try{
        const result = await axios.get(`https://api.twitch.tv/helix/games?id=${id}`, {
            headers: { 'Client-ID': config.twitchClientID }
        });
        return result.data.data[0].name;
    }
    catch(error){
        console.error(error);
    }
}

function gameLookupOld(id){
    let options = {
        headers: {
            'Client-ID': config.twitchClientID,
        },
        host: 'api.twitch.tv',
        path: `/helix/games?id=${id}`,
        method: 'GET'
    };
    https.get(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', async () => {
            let obj = await JSON.parse(data);
            return obj.data[0].name;
        });
    }).on("error", (err) => {
        console.log(err);
    });
}

// Loads all streamer JSON files in the /data/streamers directory into a new Collection for use
function loadStreamers(){
    let streamers = new Discord.Collection();
    const streamerFiles = fs.readdirSync('./data/streamers').filter(file => file.endsWith('.json'));
    for(const file of streamerFiles){
        let streamer = JSON.parse(fs.readFileSync(`./data/streamers/${file}`));
        streamers.set(streamer.username, streamer);
    }
    return streamers;
}

// Loads all guild JSON files in the /data/guilds directors into a new Collection for use
function loadGuilds(){
    let guildsWithPrefs = new Discord.Collection();
    const guildFiles = fs.readdirSync('./data/guilds').filter(file => file.endsWith('.json'));
    for(const file of guildFiles){
        let guild = JSON.parse(fs.readFileSync(`./data/guilds/${file}`));
        guildsWithPrefs.set(guild.id, guild);
    }
    return guildsWithPrefs;
}
