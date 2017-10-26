exports.run = (client, message, bool) => {
  if(bool){
    //fight
    console.log("Fight response activated.");
    message.channel.send(`**HEY!** You can't say that here, fucko.`);
  }
  else{
    //flight
    console.log("Flight response activated.");
    message.channel.send(`I guess I should just dodge...`);
    client.user.setPresence({ status:'invisible' })
        .then(() =>{
          setTimeout(()=>{
            client.user.setPresence({ status: 'online' });
          }, 10000)
        })
        .catch(console.log);
  }
}
