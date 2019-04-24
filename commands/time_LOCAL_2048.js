module.exports = {
    name: 'time',
    description: "Returns current time.",
    category: "utility",
    execute(message){
        console.log(`Command ${module.exports.name} received from ${message.author.username}`);
        const d = new Date();
        console.log(`Old UTC Offset: ${-1*d.getTimezoneOffset()/60}`);
        if(d.getTimezoneOffset() === 0){
           d.setHours(d.getHours()-4);
        }
        console.log(`New UTC Offset: ${-1*d.getTimezoneOffset()/60}`);
        console.log(d.toLocaleString('en-US'));
        /*let currentHour = message.createdAt.getHours();
        let PM = false;
        if(currentHour > 12){
          currentHour -= 12;
          PM = true;
        }

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
        else message.reply(`it is ${timeString}.`);*/
    }
}
