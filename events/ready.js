const logger = require('winston');
const presence = require("../commands/presence.js");

// noinspection Annotator
logger.remove(logger.transports.Console);
// noinspection Annotator
logger.add(logger.transports.Console, {colorize: true});
logger.level = 'debug';

exports.run = (client) => {
  // noinspection Annotator
  logger.info("Connected");
  // noinspection Annotator
  logger.info("Logged in as : ");
  // noinspection Annotator
  logger.info(`${client.user.username} - (${client.user.id})`);
  presence.setPresence(client);
  client.interval = setInterval(presence.setPresence, 60000*5, client);
};
