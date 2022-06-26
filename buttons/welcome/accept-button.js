module.exports = {
    name: 'accept-button',
    async runInteraction (client, interaction) {
        await interaction.member.roles.add('990642334007975976', 'Acceptation du règlement');
        await interaction.reply({ content:"Vous avez accpeté les règles, vous pouvez maintenant accéder au serveur !", ephemeral: true });
    }
};