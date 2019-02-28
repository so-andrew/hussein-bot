exports.run = (client) => {
    console.log("Connection interrupted, please restart manually.");
    client.destroy();
    process.exit();
    return;
};
