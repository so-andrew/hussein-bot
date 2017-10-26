exports.run = (client, message, args) => {
    console.log("Command !%s received from %s", "pizzatime", message.author.username);
    if (message.member.voiceChannel) {
      //console.log(message.member.roles);
      if(message.guild.name == "Memespeak" && message.member.roles.has("363122813680353290")){
      message.member.voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playFile('./resources/shindeiru.mp3');
                if(parseInt(args) === 0){
                    dispatcher.setVolume(0);
                }
                else dispatcher.setVolume(0.75);
                dispatcher.on('end', () => {
                    setTimeout(()=>{
                        try{
                            message.member.voiceChannel.leave();
                        }
                        catch(err){
                            console.log(err);
                        }
                    }, 3000);
                });

                dispatcher.on('error', e => {
                    console.log(e);
                });
            })
            .catch(console.log);
      }
      else{
      message.member.voiceChannel.join()
          .then(connection => {
              const dispatcher = connection.playFile('./resources/shindeiru.mp3');
              if(parseInt(args) === 0){
                  dispatcher.setVolume(0);
              }
              else dispatcher.setVolume(0.75);
              dispatcher.on('end', () => {
                  setTimeout(()=>{
                      try{
                          message.member.voiceChannel.leave();
                      }
                      catch(err){
                          console.log(err);
                      }
                  }, 3000);
              });

              dispatcher.on('error', e => {
                  console.log(e);
              });
              message.delete()
                .catch(console.error);
          })
          .catch(console.log);
    }
  }
  else message.reply('join a voice channel first.');
};
