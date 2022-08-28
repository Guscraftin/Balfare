const ownerId = process.env.OWNER_ID;

module.exports = {
    name: 'invitation',
    async runInteraction (client, interaction) {
        if (interaction.user.id != ownerId) return interaction.reply({ content: "La seule personne pouvant actionner ce bouton est le propriétaire du bot !", ephemeral: true});

        let inviteURL;

        await client.guilds.fetch(interaction.message.embeds[0].footer.text.slice(16)).then(async function (guild) {
            inviteURL = guild.invites.create(guild.channels.cache.find(channel => channel.type !== 4), {maxUses: 1, maxAge: 10, unqiue: true, reason: "Contrôle par le propriétaire du bot"}).then(function (invite) {
                inviteURL = invite.url;
            });
            await inviteURL;
        });

        await interaction.reply({ content: `Voici le lien d'invitation : ${inviteURL}`, ephemeral: true});
    }
};