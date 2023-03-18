const { EmbedBuilder } = require('discord.js');

// Diff entre bot et membre
// revoir l'affichage du kick + ajouter si ban
// Fix: Si kickLog est égal à undefined

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member){
        const fetchGuild = await client.getGuild(member.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel === undefined) return;

        const fetchKickLog = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 20
        });

        const kickLog = fetchKickLog.entries.first();
        const { target, reason } = kickLog;
        let isMemberKick = false;

        if (target.id === member.id) isMemberKick = true;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#dc143c')
            .setDescription(`• Nom d'utilisateur : ${member.displayName} - \`${member.user.tag}\` (${member.id})
            • Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            • Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            • Quitté le : <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
            • Kick ? : ${isMemberKick ? `🟢 (raison : ${reason})` : `🔴`}
            `)
            .setTimestamp()
            .setFooter({ text: "L'utilisateur a quitté !" })

        logChannel.send({ embeds: [embed] });
    }
};