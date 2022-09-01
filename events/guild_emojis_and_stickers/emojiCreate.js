const { EmbedBuilder } = require('discord.js');

// Qui a créer l'émoji

module.exports = {
    name: 'emojiCreate',
    once: false,
    async execute(client, emoji){
        const fetchGuild = await client.getGuild(emoji.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'un emoji`)
            .setColor('#009ECA')
            .setDescription(`**L'emoji ${emoji} a été créé.**
            > **Nom:Id :** \`${emoji.identifier}\`
            > **Emoji animé :** \`${emoji.animated ? `Oui` : `Non` }\`
            `)
            .setThumbnail(emoji.url)
            .setTimestamp()
            .setFooter({ text: emoji.guild.name, iconURL: emoji.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};