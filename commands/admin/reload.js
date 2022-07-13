module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    examples: ['reload'],
    description: 'Relancer le bot!',
    async runInteraction (client, interaction) {
        await interaction.reply('Bot relancé avec succès !');
        return process.exit();
    }
};