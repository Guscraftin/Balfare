module.exports = {
    name: 'debug',
    once: false,
    async execute(client, info){
        const warnLogChannel = client.channels.cache.get('1020297998628044801');
        if (warnLogChannel == undefined) return;
    
        warnLogChannel.send(`**Info debug : ** \`${info}\``);
    }
};