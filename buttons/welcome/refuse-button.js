// Warn when the owner refuses the regulation

module.exports = {
    name: 'refuse-button',
    async runInteraction (client, interaction) {
        try {
            await interaction.member.send(`Tu n'as pas accepté les règles, donc je t'ai kick !`);
        } catch(e) {
            await interaction.reply(`Le membre ${interaction.member.displayName} n'a pas accepté le règlement, je l'ai kick !`);
        }

        await interaction.member.kick("Il n'a pas accepté les règles");
    }
};