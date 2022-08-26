const { EmbedBuilder } = require('discord.js');

// On ne sait pas qui la supprimé ni crée

module.exports = {
    name: 'inviteDelete',
    once: false,
    async execute(client, invite){
        const fetchGuild = await client.getGuild(invite.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setTitle('Invitation : Suppression')
            .setColor('#009ECA')
            .setDescription(`**Invitation supprimé par un modérateur dans ${invite.channel}.**
            > **Code :** \`${invite.code}\`
            > **A invité :** \`${invite.memberCount === null ? `0` : `${invite.memberCount}`}\` utilisateurs
            `)
            .setTimestamp()
            .setFooter({ text: invite.guild.name, iconURL: invite.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};