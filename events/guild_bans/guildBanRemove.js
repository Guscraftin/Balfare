const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildBanRemove',
    once: false,
    async execute(client, ban){
        const fetchGuild = await client.getGuild(ban.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setTitle(`Débanissement`)
            .setColor('#009ECA')
            .setDescription(`**\`${ban.user.tag}\` a été débanni.**
            > **Id :** \`${ban.user.id}\`
            > **Surnom :** \`${ban.user.username}\`
            > **Raison :** \`${ban.reason === null ? `Aucune raison fourni` : `${ban.reason}`}\`
            `)
            .setThumbnail(ban.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL() })
        
        console.log('-'+ban.reason+'-');
        logChannel.send({ embeds: [embed] });
    }
};