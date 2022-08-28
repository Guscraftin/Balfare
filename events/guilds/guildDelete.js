const { EmbedBuilder } = require('discord.js');

// A quitter le serveur après combien de temps
// Désactiver les boutons sous le message de guildCreate

module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(client, guild){
        await client.deleteGuild(guild);

        const generalLogChannel = client.channels.cache.get('1013014898810290236');

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .setColor('#c40000')
            .setDescription(`**${client.user} a quitté le serveur \`${guild.name}\`.**
            > **Rejoint le :** <t:${parseInt(guild.joinedTimestamp / 1000)}:f> (<t:${parseInt(guild.joinedTimestamp / 1000)}:R>)
            > **Quitté le :** <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: `Id du serveur : ${guild.id}`, iconURL: guild.iconURL() })
    
        generalLogChannel.send({ embeds: [embed] });
    }
};