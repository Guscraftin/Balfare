module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log("I'am ready !");

        const devGuild = await client.guilds.cache.get('746002648506826793');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
};