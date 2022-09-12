const { PermissionsBitField } = require('discord.js');
const ownerId = process.env.OWNER_ID;

module.exports = {
    name: 'invitation',
    async runInteraction (client, interaction) {
        if (interaction.user.id != ownerId) return interaction.reply({ content: "La seule personne pouvant actionner ce bouton est le propriétaire du bot !", ephemeral: true});

        let inviteURL;
        let serverOwner;

        await client.guilds.fetch(interaction.message.embeds[0].footer.text.slice(16)).then(async function (guild) {
            serverOwner = guild.ownerId;
            
            if (!guild.available) return interaction.reply({ content: `\`\`\`diff\n- Le serveur n'est pas accessible.\`\`\`\n__Raisons possibles :__\n> **-> Panne du serveur ?**\n> Solution : voir le statut des serveurs de discord\n\n__Propriétaire du serveur :__ <@${serverOwner}>\n_ _`, ephemeral: true});

            let channel;
            await guild.channels.fetch().then(function (channels) {
                channel = channels.find(channel => channel.type !== 4 && channel.permissionsFor(client.user).has(PermissionsBitField.Flags.CreateInstantInvite))
            });

            if (channel === undefined) return interaction.reply({ content: `\`\`\`diff\n- Le serveur n'est pas accessible.\`\`\`\n__Raisons possibles :__\n> **-> Le bot a besoin de plus de permissions ?**\n> Solution : contacter le propriétaire du serveur => <@${serverOwner}>\n_ _`, ephemeral: true});

            inviteURL = guild.invites.create(channel, {maxUses: 1, maxAge: 10, unqiue: true, reason: "Contrôle du serveur par le propriétaire du bot"}).then(function (invite) {
                inviteURL = invite.url;
            });

            await inviteURL;
            await interaction.reply({ content: `Voici le lien d'invitation : ${inviteURL}`, ephemeral: true});

        }).catch((error) => interaction.reply({ content: `\`\`\`diff\n- Le serveur n'est pas accessible.\`\`\`\n__Raisons possibles :__\n> **-> Le bot n'est plus sur le serveur ?**\n> Solution : vérifier avec la commande pour afficher la liste des serveurs\n\n__Propriétaire du serveur :__ <@${serverOwner}>\n_ _`, ephemeral: true}));
    }
};