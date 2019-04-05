module.exports = {
    name: 'doajig',
    description: "Hussein Bot reaffirms his servitude to you with a little jig and a potentially offensive picture.",
    offensive: true,
    cooldown: 5,
    execute(message){
      console.log(`Command !%s received from %s`, "doajig", message.author.username);
      message.channel.send('Yes masta\n\n' + 'http://africaamericanculturalnarratives.weebly.com/uploads/2/5/0/4/25046162/6179333_orig.jpg');
    }
}
