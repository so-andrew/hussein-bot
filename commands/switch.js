module.exports = {
    name: 'switch',
    description: "Switches between modes (not functional yet)",
    dev: true,
    async execute(message){
        if(message.client.mode == 1){
            try{
                await message.client.user.setAvatar('./resources/negated.png')
                console.log(`Tyler mode activated.`);
                message.guild.members.get(338222977516568576).setNickname("Tyler Bot");
                message.client.mode = 2;
            }
            catch(error){
                console.error(error);
            }
        }
        else if(message.client.mode == 2){
            try{
                await message.client.user.setAvatar('./resources/hussein.png')
                console.log(`Hussein mode activated.`);
                message.guild.members.get(338222977516568576).setNickname("Hussein Bot");
                message.client.mode = 1;
            }
            catch(error){
                console.error(error);
            }
        }
    }
}
