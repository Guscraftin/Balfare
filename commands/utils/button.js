const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('primary-button')
            .setLabel('Primary')
            .setStyle(ButtonStyle.Primary),
        
        new ButtonBuilder()
            .setCustomId('secondary-button')
            .setLabel('Secondary')
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId('success-button')
            .setLabel('Success')
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('danger-button')
            .setLabel('Danger')
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
            .setURL('https://discord.com')
            .setLabel('Link')
            .setStyle(ButtonStyle.Link)
    )

module.exports = {
    name: 'button',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'button',
    examples: ['button'],
    description: "Permet de tester le fonctionnement des bouttons",
    async runInteraction (client, interaction) {
        await interaction.reply({ content: 'Cliquer sur les boutons', components: [buttons] });
    }
};