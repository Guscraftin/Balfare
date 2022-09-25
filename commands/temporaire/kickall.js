const { PermissionsBitField } = require('discord.js');

// Can kick everyone by being Owner

module.exports = {
    name: 'kickall',
    category: 'temporaire',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'kickall',
    examples: ['kickall'],
    description: "Kick tous les utilisateurs qui n'ont pas de rôle avec un message en MP.",
    async runInteraction (client, interaction) {
        let inviteURL;
        let channel;
        await interaction.guild.channels.fetch().then(function (channels) {
            channel = channels.find(channel => channel.type !== 4 && channel.permissionsFor(client.user).has(PermissionsBitField.Flags.CreateInstantInvite))
        });

        inviteURL = interaction.guild.invites.create(channel, {maxAge: 0, maxUses: 0, reason: "Invite des membres qui ont été expulsé involontairement."}).then(function (invite) {
            inviteURL = invite.url;
        });

        await inviteURL;

        await interaction.guild.members.fetch().then(users => {
            for (let i = 0; i < users.size; i++) {
                let user = users.at(i);
                if (user.roles.cache.size == 1 && !user.user.bot && user.kickable) {
                    async function sendMpMessage() {
                        try {
                            await user.send(`Bonjour, je suis \`Alfare\`, l'assistant virtuel du serveur **${interaction.guild.name}**.\nJe te contacte suite à ton expulsion du serveur, car tu n'as pas accepté le règlement avant le temps imparti.\n\nSi tu souhaites __retourner sur le serveur__, voici le lien d'invitation : ${inviteURL}`);
                            console.log(`${user.user.tag}(${user.id}) a bien reçu son MP.`);
                        } 
                        catch(e) {
                            console.log(`${user.user.tag}(${user.id}) n'autorise pas l'envoie de MP.`);
                        }
                        
                        await user.kick("A cause de l'excécution de la commande kickall");
                    }
                    sendMpMessage();
                }
            };
        });

        interaction.reply({content: `Fait !`, ephemeral: true});
    }
};