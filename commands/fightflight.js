module.exports = {
    name: 'fightflight',
    description: "Fight or flight response",
    dev: true,
    offensive: true,
    execute(message, bool){
        if(bool){
          //fight
          console.log("Fight response activated.");
          message.channel.send(`**HEY!** You can't say that here, fucko.`);
        }
        else{
          //flight
          console.log("Flight response activated.");
          message.channel.send(`I guess I should just dodge...`);
          message.client.user.setPresence({ status:'invisible' })
              .then(() =>{
                setTimeout(()=>{
                  message.client.user.setPresence({ status: 'online' });
                }, 10000)
              })
              .catch(console.log);
        }
    }
}
