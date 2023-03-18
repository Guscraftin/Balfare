const { EmbedBuilder } = require('discord.js');

// Détailler l'embed

module.exports = {
    name: 'guildScheduledEventDelete',
    once: false,
    async execute(client, guildScheduledEvent){
        const fetchGuild = await client.getGuild(guildScheduledEvent.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        const user = guildScheduledEvent.creator;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`${user} a **supprimé** un événement nommé \`${guildScheduledEvent.name}\`
            `)
            .setTimestamp()
            .setFooter({ text: guildScheduledEvent.guild.name, iconURL: guildScheduledEvent.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};