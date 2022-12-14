const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'inviteCreate',
    once: false,
    async execute(client, invite){
        const fetchGuild = await client.getGuild(invite.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        invite.guild.members.fetch("602488711770406944").then(function(member) {
            member.edit({ roles: ['1021006697583611915', '1021006702172180531', '1021006708883083315', '1021006712855072810'] });
        })

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${invite.inviter.tag}`, iconURL: invite.inviter.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**Invitation crée par ${invite.inviter} dans ${invite.channel}.**
            > **Code :** \`${invite.code}\`
            > **Expire le :** <t:${parseInt(invite.expiresTimestamp / 1000)}:f> <t:${parseInt(invite.expiresTimestamp / 1000)}:R>
            > **Nombre d'utilisateur maximum :** ${invite.maxUses === 0 ? `\`Illimité\`` : `\`${invite.maxUses}\``}
            `)
            .setTimestamp()
            .setFooter({ text: invite.guild.name, iconURL: invite.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};