const Discord = require('discord.js');
const axios = require('axios');
const express = require('express');
let app = express();
app.use(express.json());
const fs = require('fs');

module.exports.subscribe = (client) => {
  console.log(`${currentTime()} - Subscribing to webhooks...`);
  const streamers = loadStreamers();
  streamers.forEach((streamer) => {
      setTimeout(request, 3000, client, streamer);
  });
}

async function request(client, streamer){
  const result = await axios({
      method: 'post',
      url: 'https://api.twitch.tv/helix/webhooks/hub',
      data: {
          'hub.callback': 'http://128.227.180.185:80/twitch',
          'hub.mode': 'subscribe',
          'hub.topic': `https://api.twitch.tv/helix/users?id=${streamer.id}`,
          'hub.lease_seconds': 240
      }
  })

  console.log(result);

}

function loadStreamers(){
    let streamers = new Discord.Collection();
    const streamerFiles = fs.readdirSync('./data/streamers').filter(file => file.endsWith('.json'));
    for(const file of streamerFiles){
        let streamer = JSON.parse(fs.readFileSync(`./data/streamers/${file}`));
        streamers.set(streamer.username, streamer);
    }
    return streamers;
}

function currentTime(){
    const d = new Date();
    let minuteString = d.getMinutes().toString();
    if(d.getMinutes() < 10) minuteString = "0" + minuteString;
    let secondString = d.getSeconds().toString();;
    if(d.getSeconds() < 10) secondString = "0" + secondString;
    return `${d.getHours()}:${minuteString}:${secondString}`;
}
