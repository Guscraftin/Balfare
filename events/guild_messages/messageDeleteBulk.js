const { EmbedBuilder } = require('discord.js');

// Ajouter la retanscription des messages supprimé

module.exports = {
    name: 'messageDeleteBulk',
    once: false,
    async execute(client, messages, channel){
        const fetchGuild = await client.getGuild(channel.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setTitle('💥 - Suppression en masse de message')
            .setColor('#009ECA')
            .setDescription(`**Plusieurs messages supprimés par un bot dans le salon ${channel}.**
            `)
            .setTimestamp()
            .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};