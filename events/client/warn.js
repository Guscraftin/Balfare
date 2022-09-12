module.exports = {
    name: 'warn',
    once: false,
    async execute(client, info){
        const warnLogChannel = client.channels.cache.get('1014531238092087337');
        if (warnLogChannel == undefined) return;

        warnLogChannel.send(`**Info warn : ** \`${info}\``);
    }
};