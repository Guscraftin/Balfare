const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stickerUpdate',
    once: false,
    async execute(client, oldSticker, newSticker){
        const fetchGuild = await client.getGuild(newSticker.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Modification d'un sticker`)
            .setColor('#009ECA')
            .setDescription(`**Le sticker \`${newSticker.name}\` a été modifié.**
            ${oldSticker.name !== newSticker.name ? `> **Nom :** \`${oldSticker.name}\` => \`${newSticker.name}\`\n` : `` } ${oldSticker.tags !== newSticker.tags ? `> **Emoji similaire :** :${oldSticker.tags}: => :${newSticker.tags}:\n` : `` } ${oldSticker.description !== newSticker.description ? `>>> **Description :** \`\`\`${oldSticker.description}\`\`\` **=>** \`\`\`${newSticker.description}\`\`\`` : `` }
            `)
            .setImage(newSticker.url)
            .setTimestamp()
            .setFooter({ text: newSticker.guild.name, iconURL: newSticker.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};