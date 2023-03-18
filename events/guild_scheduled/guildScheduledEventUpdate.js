const { EmbedBuilder } = require('discord.js');

// Détailler l'embed

module.exports = {
    name: 'guildScheduledEventUpdate',
    once: false,
    async execute(client, oldGuildScheduledEvent, newGuildScheduledEvent){
        const fetchGuild = await client.getGuild(newGuildScheduledEvent.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        const user = newGuildScheduledEvent.creator;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`${user} a **mise à jour** l'événement nommé \`${newGuildScheduledEvent.name}\`
            `)
            .setTimestamp()
            .setFooter({ text: newGuildScheduledEvent.guild.name, iconURL: newGuildScheduledEvent.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};