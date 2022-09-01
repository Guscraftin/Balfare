const ownerId = process.env.OWNER_ID;

module.exports = {
    name: 'kicker',
    async runInteraction (client, interaction) {
        if (interaction.user.id != ownerId) return interaction.reply({ content: "La seule personne pouvant actionner ce bouton est le propriétaire du bot !", ephemeral: true});

        let serverOwner;

        client.guilds.fetch(interaction.message.embeds[0].footer.text.slice(16)).then(async function (guild) {
            serverOwner = guild.ownerId;

            if (!guild.available) return interaction.reply({ content: `\`\`\`diff\n- Le serveur n'est pas accessible.\`\`\`\n__Raisons possibles :__\n> **-> Panne du serveur ?**\n> Solution : voir le statut des serveurs de discord\n\n__Propriétaire du serveur :__ <@${serverOwner}>\n_ _`, ephemeral: true});

            await guild.leave().catch(console.error);
            interaction.reply({ content: `J'ai quitté le serveur en question nommé \`${guild.name}\` !`, ephemeral: true});

        }).catch((error) => interaction.reply({ content: `\`\`\`diff\n- Le serveur n'est pas accessible.\`\`\`\n__Raisons possibles :__\n> **-> Le bot n'est plus sur le serveur ?**\n> Solution : vérifier avec la commande pour afficher la liste des serveurs\n\n__Propriétaire du serveur :__ <@${serverOwner}>\n_ _`, ephemeral: true}));
    }
};