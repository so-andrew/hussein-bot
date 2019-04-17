const https = require('https');
const config = require('../config.json');
const Discord = require('discord.js');
const fs = require('fs');
const axios = require('axios');
axios.defaults.headers.common['Client-ID'] = config.twitchClientID;
const webhook = new Discord.WebhookClient("565622071405838347", "OTPG2iZ_FQrgey1uob_1qk2l5c3Vb_u9ts8gTJ2j3GBtxC1SpEY69cnaPAWXE4qHcsFZ");
// userlookup: `/helix/users/?login=${args[0]}`
// streamlookup: `/helix/streams?user_login=${args[0]}`

module.exports = {
    name: 'test',
    description: "HTTPS test function",
    dev: true,
    async execute(message, args){
        /*let options = {
            headers: {
                'Client-ID': config.twitchClientID,
            },
            host: 'api.twitch.tv',
            path: `/helix/streams?user_login=${args[0]}`,
            method: 'GET'
        };
        //let gameString = "test";
        https.get(options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', async () => {
                let obj = await JSON.parse(data);
                //console.log(obj);
                /*if(obj.data.length){
                   //let channel = message.client.guilds.get("286286161880678402").channels.get("338427287773118465");
                   //channel.send(`${obj.data[0].id}`);
                }
                else message.channel.send("This streamer is not live right now.");
            });
        }).on("error", (err) => {
            console.log(err);
        });
        */
        //fs.writeFileSync(`./data/streamers/test.txt`, "test");
        //console.log(message.client.twitchGames);
        /*let gs = "nig";
        let output;
        if(!message.client.twitchGames.has("33214")){
            try{
                const output = await gameLookup(33214);
                gs = output;
                console.log(output);
            }
            catch(err){
                console.error(err);
            }
            //message.client.twitchGames.set("33214", gs);
            //fs.writeFileSync('./data/twitchgames.json', JSON.stringify(Array.from(message.client.twitchGames.entries())))
        }
        else{
            gs = message.client.twitchGames.get("33214");
        }
        //console.log(`gameString = ${gameString}`);
        const embed = new Discord.RichEmbed()
           .setTitle(`**cyn0va has gone live!**`)
           .addField("Stream Title", "Playing video games", true)
           .addField("Playing", gs, true)
           .addField("URL", `https://www.twitch.com/cyn0va`)
           .setThumbnail("https://static-cdn.jtvnw.net/jtv_user_pictures/24c28959-09f9-44e4-a756-7bb420491a09-profile_image-300x300.jpg");
        message.channel.send({ embed: embed });
      }*/
      /*const result = await axios.get(`https://api.twitch.tv/helix/users?user_login=${name}`, {
          headers: {
              'Client-ID': config.twitchClientID,
          }
      });
      console.log(result.data.data[0]);
      //let iconString = result.data.data[0].
      */
      //webhook.send("Pepega");
      /*const result = await axios.post(`https://api.twitch.tv/helix/webhooks/hub`, {
          headers:{
              'Client-ID': config.twitchClientID,
          },
          body:{
              'hub.callback': `https://discordapp.com/api/webhooks/565622071405838347/OTPG2iZ_FQrgey1uob_1qk2l5c3Vb_u9ts8gTJ2j3GBtxC1SpEY69cnaPAWXE4qHcsFZ`,
              'hub.mode': 'subscribe',
              'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95049953'
          }
      });*/
      /*const result = await axios({
          method: 'post',
          url: 'https://api.twitch.tv/helix/webhooks/hub',
          data: {
              'hub.callback': `https://discordapp.com/api/webhooks/565622071405838347/OTPG2iZ_FQrgey1uob_1qk2l5c3Vb_u9ts8gTJ2j3GBtxC1SpEY69cnaPAWXE4qHcsFZ`,
              'hub.mode': 'subscribe',
              'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95049953',
              'hub.lease_seconds': 5
          }
      })
      console.log(result);
      if(result.status === 202) webhook.send("Pegapo");
      */
      //https://discordapp.com/api/webhooks/565622071405838347/OTPG2iZ_FQrgey1uob_1qk2l5c3Vb_u9ts8gTJ2j3GBtxC1SpEY69cnaPAWXE4qHcsFZ
      /*const user = await getUser("romanfederation");
      console.log(user.id);*/
      /*const result = await axios({
          method: 'post',
          url: 'https://api.twitch.tv/helix/webhooks/hub',
          data: {
              'hub.callback': `https://discordapp.com/api/webhooks/565622071405838347/OTPG2iZ_FQrgey1uob_1qk2l5c3Vb_u9ts8gTJ2j3GBtxC1SpEY69cnaPAWXE4qHcsFZ`,
              'hub.mode': 'subscribe',
              'hub.topic': 'https://api.twitch.tv/helix/users?id=42958178',
              'hub.lease_seconds': 240
          }
      })
      console.log(result);
      */
    }
}

async function gameLookup(id){
    console.log(`Looking up game with id ${id}.`);
    try{
        const result = await axios.get(`https://api.twitch.tv/helix/games?id=${id}`,{
            headers: {
                'Client-ID': config.twitchClientID,
            }
        });
        //console.log(result.data.data[0].name);
        output = result.data.data[0].name;
        console.log(`output = ${result.data.data[0].name}`);
        return output;
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
         //console.log(result.data);
         return result.data.data[0];
         /*if(result.data){

         }*/
    }
    catch(error){
        console.error(error);
    }
}
