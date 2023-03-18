const { EmbedBuilder } = require('discord.js');

// Détailler l'embed

module.exports = {
    name: 'guildScheduledEventUserRemove',
    once: false,
    async execute(client, guildScheduledEvent, user){
        const fetchGuild = await client.getGuild(guildScheduledEvent.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`${user} a **quitté** l'événement nommé \`${guildScheduledEvent.name}\`
            `)
            .setTimestamp()
            .setFooter({ text: guildScheduledEvent.guild.name, iconURL: guildScheduledEvent.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};