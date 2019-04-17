module.exports = {
    name: "n",
    description: "N",
    offensive: true,
    cooldown: 5,
    async execute(message){
        try{
            console.log(`Command ${module.exports.name} received from ${message.author.username}`);
            if(message.channel.type === "text") message.delete();
            const n = await message.channel.send("N");
            setTimeout(function(){ n.edit("Ni") } , 1000);
            setTimeout(function(){ n.edit("Nig") } , 2000);
            setTimeout(function(){ n.edit("Nigg") } , 3000);
            setTimeout(function(){ n.edit("Nigge") } , 4000);
            setTimeout(function(){ n.edit("Nigger") } , 5000);
            setTimeout(function(){ n.edit("Huh?") } , 6000);
            setTimeout(function(){ n.delete(10000)}, 8000);
            return;
        }
        catch(error){
            console.error(error);
        }
    }
}
