module.exports = {
    name: 'toggletwitch',
    description: "If user has the server-assigned notification role, removes the role. If user does not have role, assigns the role.",
    category: "twitch",
    params: "None",
    cooldown: 3,
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        if(message.client.guildPrefs.has(`${message.guild.id}`)){
            const guildPrefs = message.client.guildPrefs.get(`${message.guild.id}`);
            const roleExists = message.guild.roles.has(`${guildPrefs.notificationRole}`);
            if(!roleExists){
                console.log("Notification role no longer exists.");
                return message.channel.send("The notification role may no longer exist, please tell a server admin to run `!config` or `!settwitchrole` again.");
            }
		const role = message.guild.roles.get(`${guildPrefs.notificationRole}`);
            if(message.member.roles.has(`${role.id}`)){
                message.member.removeRole(role);
                console.log(`Removing role ${role.name} from ${message.member.user.username}.`);
                return message.channel.send("You will no longer receive Twitch live notifications.");
            }
            else{
                message.member.addRole(role);               
		console.log(`Assigning role ${role.name} to ${message.member.user.username}.`);
                return message.channel.send("You will now receive Twitch live notifications.");
            }
        }
    }
}
