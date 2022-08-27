const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'emojiUpdate',
    once: false,
    async execute(client, oldEmoji, newEmoji){
        const fetchGuild = await client.getGuild(newEmoji.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setTitle(`Modification d'un émoji`)
            .setColor('#009ECA')
            .setDescription(`**L'émoji ${newEmoji} a été modifié.**
            ${oldEmoji.name !== newEmoji.name ? `> **Nom :** \`${oldEmoji.name}\` => \`${newEmoji.name}\`` : ``}
            `)
            .setThumbnail(newEmoji.url)
            .setTimestamp()
            .setFooter({ text: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};