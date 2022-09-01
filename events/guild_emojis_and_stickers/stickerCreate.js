const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stickerCreate',
    once: false,
    async execute(client, sticker){
        const fetchGuild = await client.getGuild(sticker.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'un sticker`)
            .setColor('#009ECA')
            .setDescription(`**Le sticker \`${sticker.name}\` a été créé.**
            > **Emoji similaire :** :${sticker.tags}:
            ${sticker.description !== '' ? `>>> **Description :** \`\`\`${sticker.description}\`\`\`` : `` }
            `)
            .setImage(sticker.url)
            .setTimestamp()
            .setFooter({ text: sticker.guild.name, iconURL: sticker.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};