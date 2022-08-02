const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('accept-button')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('refuse-button')
            .setLabel('Refuser')
            .setStyle(ButtonStyle.Danger)
    )

const welcomeEmbed = new EmbedBuilder()
        .setTitle('Règlement du serveur')
        .setDescription('Respecter les chartes de discord (accessible en bas de leur site)')
        .setFooter({ text: 'Bienvenue sur le serveur' })
        .setTimestamp()

module.exports = {
    name: 'welcome',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'welcome',
    examples: ['welcome'],
    description: "Permet d'envoyer l'embed des règles",
    async runInteraction (client, interaction) {
        await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
    }
};