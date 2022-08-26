const { EmbedBuilder } = require('discord.js');

// Ajouter Icone + Bannière + ManagePermissionInteraction + features (partenaire, boost...)
// Revoir les détails de dessous

module.exports = {
    name: 'guildUpdate',
    once: false,
    async execute(client, oldGuild, newGuild){
        const fetchGuild = await client.getGuild(newGuild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        
        const embed = new EmbedBuilder()
            .setTitle(`Modification du serveur`)
            .setColor('#009ECA')
            .setDescription(`**Le serveur \`${newGuild.name}\` a été modifié**.
            ${oldGuild.name != newGuild.name ? `> **Nom :** \`${oldGuild.name}\` => \`${newGuild.name}\`\n` : `` }${oldGuild.afkChannel != newGuild.afkChannel ? `> **Salon inactif :** ${oldGuild.afkChannel} => ${newGuild.afkChannel}\n` : `` }${oldGuild.afkTimeout != newGuild.afkTimeout ? `> **Durée maximum d'inactivité :** \`${oldGuild.afkTimeout}\` => \`${newGuild.afkTimeout}\`\n` : `` }${oldGuild.defaultMessageNotifications != newGuild.defaultMessageNotifications ? `> **Paramètres de notification par défaut :** \`${oldGuild.defaultMessageNotifications}\` => \`${newGuild.defaultMessageNotifications}\`\n` : `` }${oldGuild.description != newGuild.description ? `> **Description :** \`${oldGuild.description}\` => \`${newGuild.description}\`\n` : `` }${oldGuild.explicitContentFilter != newGuild.explicitContentFilter ? `> **Filtre de contenus médias explicites :** \`${oldGuild.explicitContentFilter}\` => \`${newGuild.explicitContentFilter}\`\n` : `` }${oldGuild.maximumBitrate != newGuild.maximumBitrate ? `> **Débit maximal :** \`${oldGuild.maximumBitrate}\` => \`${newGuild.maximumBitrate}\`\n` : `` }${oldGuild.maximumMembers != newGuild.maximumMembers ? `> **Nombre maximal de membre :** \`${oldGuild.maximumMembers}\` => \`${newGuild.maximumMembers}\`\n` : `` }${oldGuild.mfaLevel != newGuild.mfaLevel ? `> **A2F obligatoire :** \`${oldGuild.mfaLevel}\` => \`${newGuild.mfaLevel}\`\n` : `` }${oldGuild.nsfwLevel != newGuild.nsfwLevel ? `> **Niveau NSFW :** \`${oldGuild.nsfwLevel}\` => \`${newGuild.nsfwLevel}\`\n` : `` }${oldGuild.ownerId != newGuild.ownerId ? `> **Propriétaire :** \`${oldGuild.ownerId}\` => \`${newGuild.ownerId}\`\n` : `` }${oldGuild.verificationLevel != newGuild.verificationLevel ? `> **Niveau de vérifion :** \`${oldGuild.verificationLevel}\` => \`${newGuild.verificationLevel}\`\n` : `` }${oldGuild.systemChannel != newGuild.systemChannel ? `> **Salon de message système :** ${oldGuild.systemChannel} => ${newGuild.systemChannel}\n` : `` }
            `)
            .setTimestamp()
            .setFooter({ text: newGuild.name, iconURL: newGuild.iconURL() })
    
        logChannel.send({ embeds: [embed] });
    }
};