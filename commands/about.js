exports.run = (client, message) => {
    console.log("Command !%s received from %s", "about", message.author.username);
    message.channel.send("__**Hussein Bot: \"Hi I live here\"**__\n\nCurrent version: `2.1.0`\n\nCreated by <@197598081867448320> using the Discord.js JavaScript library (Now with 200% more JavaScript)\nCredit to <@231973798436536322> for the idea and basic logic structure");
};