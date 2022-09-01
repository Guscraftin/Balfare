const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threadDelete',
    once: false,
    async execute(client, thread){
        const fetchGuild = await client.getGuild(thread.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Suppression d'un thread ${thread.type === ChannelType.GuildPublicThread ? 'public' : 'privé'}`)
            .setColor('#009ECA')
            .setDescription(`Le thread ${thread.type === ChannelType.GuildPublicThread ? `public` : `privé`} \`${thread.name}\` a été **supprimé** dans le salon ${thread.parent} par un modérateur.`)
            .setTimestamp()
            .setFooter({ text: thread.guild.name, iconURL: thread.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};