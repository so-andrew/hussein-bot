module.exports = {
    name: 'toggletwitch',
    description: "If user has the server-assigned notification role, removes the role. If user does not have role, assigns the role.",
    category: "twitch",
    params: "None",
    cooldown: 3,
    async execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(message.client.guildPrefs.has(`${message.guild.id}`)){
            const guildPrefs = message.client.guildPrefs.get(`${message.guild.id}`);
            const roleExists =  await message.guild.roles.find(role => role.id === guildPrefs.notificationRole);
            if(!roleExists){
                console.log("Notification role no longer exists.");
                return message.channel.send("The notification role may no longer exist, please tell a server admin to run `!config` or `!settwitchrole` again.");
            }
            if(message.member.roles.has(`${roleExists.id}`)){
                message.member.removeRole(roleExists);
                console.log(`Removing role ${roleExists.name} from ${message.member.user.username}.`);
                return message.channel.send("You will no longer receive Twitch live notifications.");
            }
            else{
                message.member.addRole(roleExists);
                console.log(`Assigning role ${roleExists.name} to ${message.member.user.username}.`);
                return message.channel.send("You will now receive Twitch live notifications.");
            }
        }
    }
}
