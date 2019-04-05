module.exports = {
    name: 'switch',
    description: "Switches between modes (not functional yet)",
    execute(message){
        if(message.client.mode == 1){
          message.client.user.setAvatar('./resources/negated.png')
            .then(console.log(`Tyler mode activated.`))
            .catch(console.error);
          message.guild.members.get(338222977516568576).setNickname("Tyler Bot");
          message.consoleclient.mode = 2;
        }
        else if(message.client.mode == 2){
          message.client.user.setAvatar('./resources/hussein.png')
            .then(console.log(`Hussein mode activated.`))
            .catch(console.error);
          message.guild.members.get(338222977516568576).setNickname("Hussein Bot");
          message.client.mode = 1;
        }
    }
}
