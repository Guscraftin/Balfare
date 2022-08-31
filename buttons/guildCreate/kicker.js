const ownerId = process.env.OWNER_ID;

module.exports = {
    name: 'kicker',
    async runInteraction (client, interaction) {
        if (interaction.user.id != ownerId) return interaction.reply({ content: "La seule personne pouvant actionner ce bouton est le propriétaire du bot !", ephemeral: true});

        client.guilds.fetch(interaction.message.embeds[0].footer.text.slice(16)).then(function (guild) {
            guild.leave();
            interaction.reply({ content: "J'ai quitté le serveur en question !", ephemeral: true});

        }).catch((error) => interaction.reply({ content: `Le serveur n'est pas accessible.\n> -> Panne du serveur ?\n> -> Le bot n'est plus sur le serveur ?`, ephemeral: true}));
    }
};