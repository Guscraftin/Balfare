module.exports = {
    name: 'debug',
    once: false,
    async execute(client, info){
        const warnLogChannel = client.channels.cache.get('1014524532515680256');
        if (warnLogChannel == undefined) return;
    
        warnLogChannel.send(`**Info debug : ** \`${info}\``);
    }
};