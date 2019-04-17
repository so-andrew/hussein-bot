const express = require('express');
const EventEmitter = require('events');
const app = express();
app.use(express.json());

class WebhookListener extends EventEmitter {
    listen(){
        app.post('/twitch', (req, res) => {
            const result = req.body.data[0];
            //console.log(req.body.data);
            res.send({status: 'OK'});
            this.emit('twitchLive', result);
            console.log("Event emitted!");
        });
        app.listen(80);
    }
}

const listener = new WebhookListener();
listener.listen();

module.exports = listener;
