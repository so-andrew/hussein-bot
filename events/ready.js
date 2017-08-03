const logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

exports.run = (client) => {
    client.user.setPresence({ status:'online', game: {name: 'The Coon'}})
        .then(() =>{})
        .catch(console.log);
    logger.info("Connected");
    logger.info("Logged in as : ");
    logger.info(`${client.user.username} - (${client.user.id})`);
};