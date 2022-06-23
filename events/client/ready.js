const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        Logger.client("- prêt à être utilisé !");

        const devGuild = await client.guilds.cache.get('746002648506826793');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
};