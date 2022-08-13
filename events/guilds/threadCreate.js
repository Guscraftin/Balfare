const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread){
        const fetchGuild = await client.getGuild(thread.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        const ownerThread = await thread.members.fetch(thread.ownerId);
        

        if (thread.type === ChannelType.GuildPublicThread || thread.type === ChannelType.GuildPrivateThread) {
            thread.join();

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Création d'un thread ${thread.type === ChannelType.GuildPublicThread ? `public` : `privé`} - ${ownerThread.user.tag}`, iconURL: ownerThread.user.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`Le thread ${thread.type === ChannelType.GuildPublicThread ? `public` : `privé`} <#${thread.id}> (\`${thread.name}\`) a été **créé** dans le salon ${thread.parent} par <@${thread.ownerId}>.`)
                .setTimestamp()
                .setFooter({ text: thread.guild.name, iconURL: thread.guild.iconURL() })

            logChannel.send({ embeds: [embed] });
        }
    }
};