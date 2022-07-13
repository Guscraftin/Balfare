const { MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('primary-button')
            .setLabel('Primary')
            .setStyle('PRIMARY'),
        
        new MessageButton()
            .setCustomId('secondary-button')
            .setLabel('Secondary')
            .setStyle('SECONDARY'),

        new MessageButton()
            .setCustomId('success-button')
            .setLabel('Success')
            .setStyle('SUCCESS'),

        new MessageButton()
            .setCustomId('danger-button')
            .setLabel('Danger')
            .setStyle('DANGER'),

        new MessageButton()
            .setURL('https://discord.com')
            .setLabel('Link')
            .setStyle('LINK')
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