exports.run = (client, message) =>{
    if(client.mode == 1){
      client.user.setAvatar('./resources/negated.png')
        .then(user => console.log(`Tyler mode activated.`))
        .catch(console.error);
      message.guild.members.get(338222977516568576).setNickname("Tyler Bot");
      client.mode = 2;
    }
    else if(client.mode == 2){
      client.user.setAvatar('./resources/hussein.png')
        .then(user => console.log(`Hussein mode activated.`))
        .catch(console.error);
      message.guild.members.get(338222977516568576).setNickname("Hussein Bot");
      client.mode = 1;
    }
}
