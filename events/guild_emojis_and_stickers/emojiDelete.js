const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'emojiDelete',
    once: false,
    async execute(client, emoji){
        const fetchGuild = await client.getGuild(emoji.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Suppression d'un emoji`)
            .setColor('#009ECA')
            .setDescription(`**L'emoji \`${emoji.name}\` a été supprimé.**
            > **Nom:Id :** \`${emoji.identifier}\`
            > **Auteur :** ${emoji.author === null ? `\`inconnu\`` : `<@${emoji.author.id}>`}
            > **Emoji animé :** \`${emoji.animated ? `Oui` : `Non` }\`
            `)
            .setThumbnail(emoji.url)
            .setTimestamp()
            .setFooter({ text: emoji.guild.name, iconURL: emoji.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};