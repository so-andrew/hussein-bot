exports.run = (client, member, speaking) => {
    let conn;
    let dispatcher;
    if(member.voiceChannel){
        member.voiceChannel.join()
            .then(connection =>{
            conn = connection;
                dispatcher = conn.playFile("./resources/pizzatheme.mp3");
                if(speaking === false){
                    dispatcher.resume();
                }
                else{
                    dispatcher.pause();
                }
            })
            .catch(console.log);
    }
};