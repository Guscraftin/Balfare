const Logger = require('../../utils/Logger');
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.client(`- prêt à être utilisé par ${usersCount} utilisateurs sur ${guildsCount.size} serveurs !`);

        // client.user.setPresence({ activities: [{ name: `mon développement`, type: ActivityType.watching }], status: 'dnd' });
        client.user.setPresence({ status: 'online' });


        /* Deployment of commands */

        const devGuild = await client.guilds.cache.get('746002648506826793');
        devGuild.commands.set(client.commands.map(cmd => cmd));
        // devGuild.commands.set([]); // Remove all slash commands from a server
        
        // client.application.commands.set(client.commands.map(cmd => cmd));
        // client.application.commands.set([]); // Delete all global slash commands
    }
};