module.exports = {
    name: 'time',
    description: "Returns current time.",
    category: "utility",
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        let currentHour = message.createdAt.getHours();
        let PM = false;
        if(currentHour > 12){
          currentHour -= 12;
          PM = true;
        }

        const d = new Date();
        console.log(d.getTimezoneOffset());
        console.log(message.guild.region);
      
        let timeString = `${currentHour}:${message.createdAt.getMinutes()}`
        if(PM === true){
          timeString+= " PM"
        }
        else timeString += ""
        console.log(`The time is ${timeString}.`);
        if(message.createdAt.getHours() >=2 && message.createdAt.getHours() <= 5){
          message.reply(`it is ${timeString}. You should probably get some rest.`)
        }
        else if(message.createdAt.getHours() >= 6 && message.createdAt.getHours() <= 9){
          message.reply(`it is ${timeString}. It's way too early for this.`);
        }
        else message.reply(`it is ${timeString}.`);
    }
}
