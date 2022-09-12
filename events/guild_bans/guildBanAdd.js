const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildBanAdd',
    once: false,
    async execute(client, ban){
        const fetchGuild = await client.getGuild(ban.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        
        let reason;
        await ban.guild.bans.fetch(ban.user).then(function (ban) {
            reason = ban.reason;
        });

        const embed = new EmbedBuilder()
            .setTitle(`Banissement`)
            .setColor('#009ECA')
            .setDescription(`**\`${ban.user.tag}\` a été banni.**
            > **Id :** \`${ban.user.id}\`
            > **Surnom :** \`${ban.user.username}\`
            > **Raison :** \`${reason === null ? `Aucune raison fourni` : `${reason}`}\`
            `)
            .setThumbnail(ban.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL() })
    
        logChannel.send({ embeds: [embed] });
    }
};