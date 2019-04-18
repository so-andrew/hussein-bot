exports.run = (client, member) => {
    console.log(`${member.tag} has joined a guild.`);
    const guild = member.guild;
    if(client.guildPrefs.has(`${guild.id}`)){
        const guildPrefs = client.guildPrefs.get(`${guild.id}`);
        const roleExists =  await guild.roles.find(role => role.id === guildPrefs.notificationRole);
        if(!roleExists) console.log("Notification role no longer exists, not assigning role.");
        else{
            member.addRole(roleExists);
            console.log(`Assigning role ${roleExists.name} to ${member.tag}.`);
        }
    }
}
