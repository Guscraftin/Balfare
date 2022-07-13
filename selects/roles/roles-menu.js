module.exports = {
    name: 'roles-menu',
    async runInteraction (client, interaction) {
        await interaction.member.roles.add(interaction.values);
        await interaction.reply({ content:"Félicitation, le bot vous a ajouté votre rôle !", ephemeral: true });
    }
};