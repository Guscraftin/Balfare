const { ChannelType } = require('discord.js');

module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread){
        const fetchGuild = await client.getGuild(thread.guild);

        if (thread.type === ChannelType.GuildPublicThread || thread.type === ChannelType.GuildPrivateThread) thread.join();
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send(`Création d'un thread: ${thread.name} !`);
    }
};