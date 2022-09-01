const { EmbedBuilder, PermissionsBitField } = require('discord.js');

// Quand la position du rôle a changé - Image du rôle pour nitro a changé

module.exports = {
    name: 'roleUpdate',
    once: false,
    async execute(client, oldRole, newRole){
        const fetchGuild = await client.getGuild(newRole.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        const oldPermissions = oldRole.permissions;
        const newPermissions = newRole.permissions;
        
        const embed = new EmbedBuilder()
            .setTitle(`Modification d'un rôle`)
            .setColor('#009ECA')
            .setDescription(`**Le rôle \`${newRole.name}\` a été modifié**.
            ${oldRole.name != newRole.name ? `> **Nom :** \`${oldRole.name}\` => \`${newRole.name}\`\n` : `` } ${oldRole.hexColor != newRole.hexColor ? `> **Couleur :** \`${oldRole.hexColor}\` => \`${newRole.hexColor}\`\n` : `` } ${oldRole.mentionable != newRole.mentionable ? `> **Mentionnable :** \`${oldRole.mentionable ? `Oui` : `Non`}\` => \`${newRole.mentionable ? `Oui` : `Non`}\`\n` : `` } ${oldRole.hoist != newRole.hoist ? `> **Affiché séparément :** \`${oldRole.hoist ? `Oui` : `Non`}\` => \`${newRole.hoist ? `Oui` : `Non`}\`\n` : `` }
            `)
            .addFields(setListFields())
            .setTimestamp()
            .setFooter({ text: newRole.guild.name, iconURL: newRole.guild.iconURL() })
    
        if (oldRole.rawPosition != newRole.rawPosition) return;
        logChannel.send({ embeds: [embed] });


        function setListFields() {
            var listReturn =  [];

            const generalsPermissions = setGeneralsPermissions();
            generalsPermissions !== '' ? `${listReturn.push({name: `Permissions générales de serveur`, value: generalsPermissions, inline: false},)}` : ``;
            const membersPermissions = setMemberPermissions();
            membersPermissions !== '' ? `${listReturn.push({name: `Permissions des membres`, value: membersPermissions, inline: false},)}` : ``;
            const textuelPermissions = setTextuelPermissions();
            textuelPermissions !== '' ? `${listReturn.push({name: `Permissions de salon textuel`, value: textuelPermissions, inline: false},)}` : ``;
            const vocalPermissions = setVocalPermissions();
            vocalPermissions !== '' ? `${listReturn.push({name: `Permissions de salon vocal`, value: vocalPermissions, inline: false},)}` : ``;
            const conferencePermissions = setConferencePermissions();
            conferencePermissions !== '' ? `${listReturn.push({name: `Permissions de salon de conférence`, value: conferencePermissions, inline: false},)}` : ``;
            const evenementPermissions = setEvenementPermissions();
            evenementPermissions !== '' ? `${listReturn.push({name: `Permissions des événements`, value: evenementPermissions, inline: false},)}` : ``;
            const advancedPermissions = setAdvancedPermissions();
            advancedPermissions !== '' ? `${listReturn.push({name: `Permissions des avancées`, value: advancedPermissions, inline: false},)}` : ``;
            return listReturn;
        }


        function setGeneralsPermissions() {
            const field0 = `${oldPermissions.has(PermissionsBitField.Flags.ViewChannel) && !newPermissions.has(PermissionsBitField.Flags.ViewChannel) ? `⛔ ▸ Voir les salons\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ViewChannel) && newPermissions.has(PermissionsBitField.Flags.ViewChannel) ? `✅ ▸ Voir les salons\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageChannels) && !newPermissions.has(PermissionsBitField.Flags.ManageChannels) ? `⛔ ▸ Gérer les salons\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageChannels) && newPermissions.has(PermissionsBitField.Flags.ManageChannels) ? `✅ ▸ Gérer les salons\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageRoles) && !newPermissions.has(PermissionsBitField.Flags.ManageRoles) ? `⛔ ▸ Gérer les rôles\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageRoles) && newPermissions.has(PermissionsBitField.Flags.ManageRoles) ? `✅ ▸ Gérer les rôles\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) && !newPermissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) ? `⛔ ▸ Gérer les emojis et les autocollants\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) && newPermissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) ? `✅ ▸ Gérer les emojis et les autocollants\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ViewAuditLog) && !newPermissions.has(PermissionsBitField.Flags.ViewAuditLog) ? `⛔ ▸ Voir les logs du serveur\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ViewAuditLog) && newPermissions.has(PermissionsBitField.Flags.ViewAuditLog) ? `✅ ▸ Voir les logs du serveur\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ViewGuildInsights) && !newPermissions.has(PermissionsBitField.Flags.ViewGuildInsights) ? `⛔ ▸ Voir les analyses de serveur\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ViewGuildInsights) && newPermissions.has(PermissionsBitField.Flags.ViewGuildInsights) ? `✅ ▸ Voir les analyses de serveur\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageWebhooks) && !newPermissions.has(PermissionsBitField.Flags.ManageWebhooks) ? `⛔ ▸ Gérer les webhooks\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageWebhooks) && newPermissions.has(PermissionsBitField.Flags.ManageWebhooks) ? `✅ ▸ Gérer les webhooks\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageGuild) && !newPermissions.has(PermissionsBitField.Flags.ManageGuild) ? `⛔ ▸ Gérer le serveur\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageGuild) && newPermissions.has(PermissionsBitField.Flags.ManageGuild) ? `✅ ▸ Gérer le serveur\n` : ``}`}`

            return field0 === '       ' ? `` : `${field0}`;
        }

        function setMemberPermissions() {
            const field1 = `${oldPermissions.has(PermissionsBitField.Flags.CreateInstantInvite) && !newPermissions.has(PermissionsBitField.Flags.CreateInstantInvite) ? `⛔ ▸ Créer une invitation\n` : `${!oldPermissions.has(PermissionsBitField.Flags.CreateInstantInvite) && newPermissions.has(PermissionsBitField.Flags.CreateInstantInvite) ? `✅ ▸ Créer une invitation\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ChangeNickname) && !newPermissions.has(PermissionsBitField.Flags.ChangeNickname) ? `⛔ ▸ Changer le speudo\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ChangeNickname) && newPermissions.has(PermissionsBitField.Flags.ChangeNickname) ? `✅ ▸ Changer le speudo\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageNicknames) && !newPermissions.has(PermissionsBitField.Flags.ManageNicknames) ? `⛔ ▸ Gérer les pseudos\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageNicknames) && newPermissions.has(PermissionsBitField.Flags.ManageNicknames) ? `✅ ▸ Gérer les pseudos\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.KickMembers) && !newPermissions.has(PermissionsBitField.Flags.KickMembers) ? `⛔ ▸ Expulser des membres\n` : `${!oldPermissions.has(PermissionsBitField.Flags.KickMembers) && newPermissions.has(PermissionsBitField.Flags.KickMembers) ? `✅ ▸ Expulser des membres\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.BanMembers) && !newPermissions.has(PermissionsBitField.Flags.BanMembers) ? `⛔ ▸ Bannir des membres\n` : `${!oldPermissions.has(PermissionsBitField.Flags.BanMembers) && newPermissions.has(PermissionsBitField.Flags.BanMembers) ? `✅ ▸ Bannir des membres\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ModerateMembers) && !newPermissions.has(PermissionsBitField.Flags.ModerateMembers) ? `⛔ ▸ Exclure temporairement des membres\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ModerateMembers) && newPermissions.has(PermissionsBitField.Flags.ModerateMembers) ? `✅ ▸ Exclure temporairement des membres\n` : ``}`}`

            return field1 === '     ' ? `` : `${field1}`;
        }

        function setTextuelPermissions() {
            const field2 = `${oldPermissions.has(PermissionsBitField.Flags.SendMessages) && !newPermissions.has(PermissionsBitField.Flags.SendMessages) ? `⛔ ▸ Envoyer des messages\n` : `${!oldPermissions.has(PermissionsBitField.Flags.SendMessages) && newPermissions.has(PermissionsBitField.Flags.SendMessages) ? `✅ ▸ Envoyer des messages\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.SendMessagesInThreads) && !newPermissions.has(PermissionsBitField.Flags.SendMessagesInThreads) ? `⛔ ▸ Envoyer des messages dans les fils\n` : `${!oldPermissions.has(PermissionsBitField.Flags.SendMessagesInThreads) && newPermissions.has(PermissionsBitField.Flags.SendMessagesInThreads) ? `✅ ▸ Envoyer des messages dans les fils\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.CreatePublicThreads) && !newPermissions.has(PermissionsBitField.Flags.CreatePublicThreads) ? `⛔ ▸ Créer des fils publics\n` : `${!oldPermissions.has(PermissionsBitField.Flags.CreatePublicThreads) && newPermissions.has(PermissionsBitField.Flags.CreatePublicThreads) ? `✅ ▸ Créer des fils publics\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.CreatePrivateThreads) && !newPermissions.has(PermissionsBitField.Flags.CreatePrivateThreads) ? `⛔ ▸ Créer des fils privés\n` : `${!oldPermissions.has(PermissionsBitField.Flags.CreatePrivateThreads) && newPermissions.has(PermissionsBitField.Flags.CreatePrivateThreads) ? `✅ ▸ Créer des fils privés\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.EmbedLinks) && !newPermissions.has(PermissionsBitField.Flags.EmbedLinks) ? `⛔ ▸ Intégrer des liens\n` : `${!oldPermissions.has(PermissionsBitField.Flags.EmbedLinks) && newPermissions.has(PermissionsBitField.Flags.EmbedLinks) ? `✅ ▸ Intégrer des liens\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.AttachFiles) && !newPermissions.has(PermissionsBitField.Flags.AttachFiles) ? `⛔ ▸ Joindre des fichiers\n` : `${!oldPermissions.has(PermissionsBitField.Flags.AttachFiles) && newPermissions.has(PermissionsBitField.Flags.AttachFiles) ? `✅ ▸ Joindre des fichiers\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.AddReactions) && !newPermissions.has(PermissionsBitField.Flags.AddReactions) ? `⛔ ▸ Ajouter des réactions\n` : `${!oldPermissions.has(PermissionsBitField.Flags.AddReactions) && newPermissions.has(PermissionsBitField.Flags.AddReactions) ? `✅ ▸ Ajouter des réactions\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.UseExternalEmojis) && !newPermissions.has(PermissionsBitField.Flags.UseExternalEmojis) ? `⛔ ▸ Utiliser des emojis externes\n` : `${!oldPermissions.has(PermissionsBitField.Flags.UseExternalEmojis) && newPermissions.has(PermissionsBitField.Flags.UseExternalEmojis) ? `✅ ▸ Utiliser des emojis externes\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.UseExternalStickers) && !newPermissions.has(PermissionsBitField.Flags.UseExternalStickers) ? `⛔ ▸ Utiliser des autocollants externes\n` : `${!oldPermissions.has(PermissionsBitField.Flags.UseExternalStickers) && newPermissions.has(PermissionsBitField.Flags.UseExternalStickers) ? `✅ ▸ Utiliser des autocollants externes\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.MentionEveryone) && !newPermissions.has(PermissionsBitField.Flags.MentionEveryone) ? `⛔ ▸ Mentionner @everyone, @here et tous les rôles\n` : `${!oldPermissions.has(PermissionsBitField.Flags.MentionEveryone) && newPermissions.has(PermissionsBitField.Flags.MentionEveryone) ? `✅ ▸ Mentionner @everyone, @here et tous les rôles\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageMessages) && !newPermissions.has(PermissionsBitField.Flags.ManageMessages) ? `⛔ ▸ Gérer les messages\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageMessages) && newPermissions.has(PermissionsBitField.Flags.ManageMessages) ? `✅ ▸ Gérer les messages\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ManageThreads) && !newPermissions.has(PermissionsBitField.Flags.ManageThreads) ? `⛔ ▸ Gérer les fils\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageThreads) && newPermissions.has(PermissionsBitField.Flags.ManageThreads) ? `✅ ▸ Gérer les fils\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.ReadMessageHistory) && !newPermissions.has(PermissionsBitField.Flags.ReadMessageHistory) ? `⛔ ▸ Voir les anciens messages\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ReadMessageHistory) && newPermissions.has(PermissionsBitField.Flags.ReadMessageHistory) ? `✅ ▸ Voir les anciens messages\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.SendTTSMessages) && !newPermissions.has(PermissionsBitField.Flags.SendTTSMessages) ? `⛔ ▸ Envoyer des messages de synthèse vocal\n` : `${!oldPermissions.has(PermissionsBitField.Flags.SendTTSMessages) && newPermissions.has(PermissionsBitField.Flags.SendTTSMessages) ? `✅ ▸ Envoyer des messages de synthèse vocal\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.UseApplicationCommands) && !newPermissions.has(PermissionsBitField.Flags.UseApplicationCommands) ? `⛔ ▸ Utiliser les commandes de l'application\n` : `${!oldPermissions.has(PermissionsBitField.Flags.UseApplicationCommands) && newPermissions.has(PermissionsBitField.Flags.UseApplicationCommands) ? `✅ ▸ Utiliser les commandes de l'application\n` : ``}`}`

            return field2 === '              ' ? `` : `${field2}`;
        }

        function setVocalPermissions() {
            const field3 = `${oldPermissions.has(PermissionsBitField.Flags.Connect) && !newPermissions.has(PermissionsBitField.Flags.Connect) ? `⛔ ▸ Se connecter\n` : `${!oldPermissions.has(PermissionsBitField.Flags.Connect) && newPermissions.has(PermissionsBitField.Flags.Connect) ? `✅ ▸ Se connecter\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.Speak) && !newPermissions.has(PermissionsBitField.Flags.Speak) ? `⛔ ▸ Parler\n` : `${!oldPermissions.has(PermissionsBitField.Flags.Speak) && newPermissions.has(PermissionsBitField.Flags.Speak) ? `✅ ▸ Parler\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.Stream) && !newPermissions.has(PermissionsBitField.Flags.Stream) ? `⛔ ▸ Vidéos\n` : `${!oldPermissions.has(PermissionsBitField.Flags.Stream) && newPermissions.has(PermissionsBitField.Flags.Stream) ? `✅ ▸ Vidéos\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) && !newPermissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) ? `⛔ ▸ Utiliser les activités\n` : `${!oldPermissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) && newPermissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) ? `✅ ▸ Utiliser les activités\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.UseVAD) && !newPermissions.has(PermissionsBitField.Flags.UseVAD) ? `⛔ ▸ Utiliser la détection de la voix\n` : `${!oldPermissions.has(PermissionsBitField.Flags.UseVAD) && newPermissions.has(PermissionsBitField.Flags.UseVAD) ? `✅ ▸ Utiliser la détection de la voix\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.PrioritySpeaker) && !newPermissions.has(PermissionsBitField.Flags.PrioritySpeaker) ? `⛔ ▸ Voix prioritaire\n` : `${!oldPermissions.has(PermissionsBitField.Flags.PrioritySpeaker) && newPermissions.has(PermissionsBitField.Flags.PrioritySpeaker) ? `✅ ▸ Voix prioritaire\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.MuteMembers) && !newPermissions.has(PermissionsBitField.Flags.MuteMembers) ? `⛔ ▸ Rendre les membres muets\n` : `${!oldPermissions.has(PermissionsBitField.Flags.MuteMembers) && newPermissions.has(PermissionsBitField.Flags.MuteMembers) ? `✅ ▸ Rendre les membres muets\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.DeafenMembers) && !newPermissions.has(PermissionsBitField.Flags.DeafenMembers) ? `⛔ ▸ Mettre en sourdine des membres\n` : `${!oldPermissions.has(PermissionsBitField.Flags.DeafenMembers) && newPermissions.has(PermissionsBitField.Flags.DeafenMembers) ? `✅ ▸ Mettre en sourdine des membres\n` : ``}`} ${oldPermissions.has(PermissionsBitField.Flags.MoveMembers) && !newPermissions.has(PermissionsBitField.Flags.MoveMembers) ? `⛔ ▸ Déplacer des membres\n` : `${!oldPermissions.has(PermissionsBitField.Flags.MoveMembers) && newPermissions.has(PermissionsBitField.Flags.MoveMembers) ? `✅ ▸ Déplacer des membres\n` : ``}`}`

            return field3 === '        ' ? `` : `${field3}`;
        }

        function setConferencePermissions() {
            const field4 = `${oldPermissions.has(PermissionsBitField.Flags.RequestToSpeak) && !newPermissions.has(PermissionsBitField.Flags.RequestToSpeak) ? `⛔ ▸ Demande de prise de parole\n` : `${!oldPermissions.has(PermissionsBitField.Flags.RequestToSpeak) && newPermissions.has(PermissionsBitField.Flags.RequestToSpeak) ? `✅ ▸ Demande de prise de parole\n` : ``}`}`

            return field4 === ' ' ? '' : `${field4}`;
        }

        function setEvenementPermissions() {
            const field5 = `${oldPermissions.has(PermissionsBitField.Flags.ManageEvents) && !newPermissions.has(PermissionsBitField.Flags.ManageEvents) ? `⛔ ▸ Gérer les événements\n` : `${!oldPermissions.has(PermissionsBitField.Flags.ManageEvents) && newPermissions.has(PermissionsBitField.Flags.ManageEvents) ? `✅ ▸ Gérer les événements\n` : ``}`}`

            return field5 === ' ' ? '' : `${field5}`;
        }

        function setAdvancedPermissions() {
            const field6 = `${oldPermissions.has(PermissionsBitField.Flags.Administrator) && !newPermissions.has(PermissionsBitField.Flags.Administrator) ? `⛔ ▸ Administrateur\n` : `${!oldPermissions.has(PermissionsBitField.Flags.Administrator) && newPermissions.has(PermissionsBitField.Flags.Administrator) ? `✅ ▸ Administrateur\n` : ``}`}`

            return field6 === ' ' ? '' : `${field6}`;
        }
    }
};