export default class GuildPrefs {
    constructor(guild){
        this.id = guild.id;
        this.name = guild.name;
        this.twitchNotificationChannel = null;
        this.prefix = "!";
    }

    setTwitchNotificationChannel(channel){
        this.twitchNotificationChannel = channel.id;
    }

    setPrefix(string){
        if(string || string.length) this.prefix = string;
        else console.log(`Attempt to assign invalid prefix string to ${this.name}.`);
    }
}
