module.exports = {
    name: 'success-button',
    async runInteraction (client, interaction) {
        await interaction.reply("Je suis le bouton Success !");
    }
};