const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'roleCreate',
    once: false,
    async execute(client, role){
        const fetchGuild = await client.getGuild(role.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        const permissions = role.permissions;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'un rôle`)
            .setColor('#009ECA')
            .setDescription(`**Le rôle \`${role.name}\` a été créé**.`)
            .setImage(role.iconURL())
            .addFields([
                {name: 'Couleur', value: `\`${role.hexColor}\``, inline: true},
                {name: 'Mentionnable', value: `\`${role.mentionable ? `Oui` : `Non`}\``, inline: true},
                {name: 'Affiché séparément', value: `\`${role.hoist ? `Oui` : `Non`}\``, inline: true},
                {name: 'Permissions générales de serveur', value: setGeneralsPermissions(), inline: false},
                {name: `Permissions des membres`, value: setMemberPermissions(), inline: false},
                {name: `Permissions de salon textuel`, value: setTextuelPermissions(), inline: false},
                {name: `Permissions de salon vocal`, value: setVocalPermissions(), inline: false},
                {name: `Permissions de salon de conférence`, value: `${permissions.has(PermissionsBitField.Flags.RequestToSpeak) ? `✅ ▸ Demande de prise de parole\n` : `❌ ▸ Aucune permission`}`, inline: false},
                {name: `Permissions des événements`, value: `${permissions.has(PermissionsBitField.Flags.ManageEvents) ? `✅ ▸ Gérer les événements\n` : `❌ ▸ Aucune permission`}`, inline: false},
                {name: `Permissions des avancées`, value: `${permissions.has(PermissionsBitField.Flags.Administrator) ? `✅ ▸ Administrateur\n` : `❌ ▸ Aucune permission`}`, inline: false}
            ])
            .setTimestamp()
            .setFooter({ text: role.guild.name, iconURL: role.guild.iconURL() })
    
        logChannel.send({ embeds: [embed] });


        
        function setGeneralsPermissions() {
            const field3 = `${permissions.has(PermissionsBitField.Flags.ViewChannel) ? `✅ ▸ Voir les salons\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageChannels) ? `✅ ▸ Gérer les salons\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageRoles) ? `✅ ▸ Gérer les rôles\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) ? `✅ ▸ Gérer les emojis et les autocollants\n` : ``} ${permissions.has(PermissionsBitField.Flags.ViewAuditLog) ? `✅ ▸ Voir les logs du serveur\n` : ``} ${permissions.has(PermissionsBitField.Flags.ViewGuildInsights) ? `✅ ▸ Voir les analyses de serveur\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageWebhooks) ? `✅ ▸ Gérer les webhooks\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageGuild) ? `✅ ▸ Gérer le serveur\n` : ``}`

            return field3 === '       ' ? `❌ ▸ Aucune permission` : `${field3}`;
        }

        function setMemberPermissions() {
            const field4 = `${permissions.has(PermissionsBitField.Flags.CreateInstantInvite) ? `✅ ▸ Créer une invitation\n` : ``} ${permissions.has(PermissionsBitField.Flags.ChangeNickname) ? `✅ ▸ Changer le speudo\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageNicknames) ? `✅ ▸ Gérer les pseudos\n` : ``} ${permissions.has(PermissionsBitField.Flags.KickMembers) ? `✅ ▸ Expulser des membres\n` : ``} ${permissions.has(PermissionsBitField.Flags.BanMembers) ? `✅ ▸ Bannir des membres\n` : ``} ${permissions.has(PermissionsBitField.Flags.MuteMembers) ? `✅ ▸ Exclure temporairement des membres\n` : ``}`

            return field4 === '     ' ? `❌ ▸ Aucune permission` : `${field4}`;
        }

        function setTextuelPermissions() {
            const field5 = `${permissions.has(PermissionsBitField.Flags.SendMessages) ? `✅ ▸ Envoyer des messages\n` : ``} ${permissions.has(PermissionsBitField.Flags.SendMessagesInThreads) ? `✅ ▸ Envoyer des messages dans les fils\n` : ``} ${permissions.has(PermissionsBitField.Flags.CreatePublicThreads) ? `✅ ▸ Créer des fils publics\n` : ``} ${permissions.has(PermissionsBitField.Flags.CreatePrivateThreads) ? `✅ ▸ Créer des fils privés\n` : ``} ${permissions.has(PermissionsBitField.Flags.EmbedLinks) ? `✅ ▸ Intégrer des liens\n` : ``} ${permissions.has(PermissionsBitField.Flags.AttachFiles) ? `✅ ▸ Joindre des fichiers\n` : ``} ${permissions.has(PermissionsBitField.Flags.AddReactions) ? `✅ ▸ Ajouter des réactions\n` : ``} ${permissions.has(PermissionsBitField.Flags.UseExternalEmojis) ? `✅ ▸ Utiliser des emojis externes\n` : ``} ${permissions.has(PermissionsBitField.Flags.UseExternalStickers) ? `✅ ▸ Utiliser des autocollants externes\n` : ``} ${permissions.has(PermissionsBitField.Flags.MentionEveryone) ? `✅ ▸ Mentionner @everyone, @here et tous les rôles\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageMessages) ? `✅ ▸ Gérer les messages\n` : ``} ${permissions.has(PermissionsBitField.Flags.ManageThreads) ? `✅ ▸ Gérer les fils\n` : ``} ${permissions.has(PermissionsBitField.Flags.ReadMessageHistory) ? `✅ ▸ Voir les anciens messages\n` : ``} ${permissions.has(PermissionsBitField.Flags.SendTTSMessages) ? `✅ ▸ Envoyer des messages de synthèse vocal\n` : ``} ${permissions.has(PermissionsBitField.Flags.UseApplicationCommands) ? `✅ ▸ Utiliser les commandes de l'application\n` : ``}`

            return field5 === '              ' ? `❌ ▸ Aucune permission` : `${field5}`;
        }

        function setVocalPermissions() {
            const field6 = `${permissions.has(PermissionsBitField.Flags.Connect) ? `✅ ▸ Se connecter\n` : ``} ${permissions.has(PermissionsBitField.Flags.Speak) ? `✅ ▸ Parler\n` : ``} ${permissions.has(PermissionsBitField.Flags.Stream) ? `✅ ▸ Vidéos\n` : ``} ${permissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) ? `✅ ▸ Utiliser les activités\n` : ``} ${permissions.has(PermissionsBitField.Flags.UseVAD) ? `✅ ▸ Utiliser la détection de la voix\n` : ``} ${permissions.has(PermissionsBitField.Flags.PrioritySpeaker) ? `✅ ▸ Voix prioritaire\n` : ``} ${permissions.has(PermissionsBitField.Flags.ModerateMembers) ? `✅ ▸ Rendre les membres muets\n` : ``} ${permissions.has(PermissionsBitField.Flags.DeafenMembers) ? `✅ ▸ Mettre en sourdine des membres\n` : ``} ${permissions.has(PermissionsBitField.Flags.MoveMembers) ? `✅ ▸ Déplacer des membres\n` : ``}`

            return field6 === '        ' ? `❌ ▸ Aucune permission` : `${field6}`;
        }
    }
};