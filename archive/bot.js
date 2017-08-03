var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    bot.setPresence({ status:'online', game: {name: 'The Coon'}});
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) === '!') {
        var indexOfFirstSpace = message.indexOf(' ');
        var cmd;
        var argsPresent;

        if (indexOfFirstSpace === -1) {
            cmd = message.substring(1);
            argsPresent = false;
        }
        else {
            argsPresent = true;
            cmd = message.substring(1, indexOfFirstSpace);
            var args = message.substring(indexOfFirstSpace + 1);
        }

        if (cmd === 'insult') {
            console.log("Command !%s received from %s", cmd, user);
            if (argsPresent === false){
                bot.sendMessage({
                    to: channelID,
                    message: 'I can\'t insult people without mentioning their ethnicity! (No ethnicity specified)'
                });
            }
            else{
                var botmessage = insult(args);
                bot.sendMessage({
                    to: channelID,
                    message: botmessage
                });
            }
        } else if (cmd === 'setgame') {
            console.log("Command !%s received from %s", cmd, user);
            if (argsPresent === false) {
                bot.sendMessage({
                    to: channelID,
                    message: 'No game specified.'
                })
            }
            else {
                bot.setPresence({status: 'online', game: {name: args}});
                bot.sendMessage({
                    to: channelID,
                    message: 'Changed game to **' + args + '**.'
                });
            }
        } else if (cmd === 'doajig') {
            console.log("Command !%s received from %s", cmd, user);
            bot.sendMessage({
                to: channelID,
                message: 'Yes masta\n\n' + 'http://africaamericanculturalnarratives.weebly.com/uploads/2/5/0/4/25046162/6179333_orig.jpg'
            });
        } else if (cmd === 'england') {
            console.log("Command !%s received from %s", cmd, user);
            bot.sendMessage({
                to: channelID,
                message: 'You know it\'s Nick Crompton and my collar stay poppin\'\n' +
                'Yes, I can rap and no, I am not from Compton\n' +
                'England is my city\n' +
                'And if it weren\'t for Team 10, then the US would be shitty\n' +
                'I\'ll pass it to Chance \'cause you know he stay litty'
            });
        } else if (cmd === 'help'){
            console.log("Command !%s received from %s", cmd, user);
            if(argsPresent === false){
                bot.sendMessage({
                    to: channelID,
                    message: '__**Commands:**__\n\n**Primary Commands:** `insult`, `setgame`, `about` \n' + '**Macros:** `doajig`, `england`'
                })
            }
        } else if (cmd === 'about'){
            console.log("Command !%s received from %s", cmd, user);
            bot.sendMessage({
                to: channelID,
                message: "__**Hussein Bot: \"Hi I live here\"**__\n\n" + "Created by <@197598081867448320> using the Discord.io JavaScript library\n" + "Credit to <@231973798436536322> for the idea and basic logic structure"
            });
        }
        else if (cmd === 'test'){
            if(argsPresent === false){

            }
            else{
                var index = args.search(/\d+/);
                var smiteID = args.slice(index, args.length - 1);
            }

        }
        else if (cmd === 'getguild'){

        }
    }
});

function insult(args){
    var botmessage;
    var uck;
    if (Math.floor(Math.random() * 10) % 2 === 0.0) {
        uck = ' cuck!';
    }
    else {
        uck = ' fuck!';
    }
    if (/Italian/i.test(args)) {
        botmessage = 'Listen here, you greasy ' + args + uck;
    }
    else {
        botmessage = 'Listen here, you dirty ' + args + uck;
    }
    return botmessage;
}
