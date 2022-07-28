const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'contextuel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'Utiliser le menu contextuel de Discord !',
    examples: ['Utiliser le menu contextuel de Discord !'],
    type: ApplicationCommandType.User,
    async runInteraction (client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#8e48f7')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields([
                { name: 'Nom', value: `${member.displayName}`, inline: true },
                { name: 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true },
                { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', '')}` },
                { name: 'A créé son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                { name: 'A rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` }
            ])

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};