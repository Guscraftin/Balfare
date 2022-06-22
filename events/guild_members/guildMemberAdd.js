const { MessageEmbed, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member){
        const accountCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeAccountCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const accountJoinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeAccountJoinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#21ff81')
            .setDescription(`• Nom d'utilisateur : ${member} - \`${member.user.tag}\` (${member.id})
            • Créé le : ${accountCreationTimestamp} (${relativeAccountCreationTimestamp})
            • Rejoint le : ${accountJoinTimestamp} (${relativeAccountJoinTimestamp})
            `)
            .setTimestamp()
            .setFooter({ text: "L'utilisateur a rejoint !" })

        const logChannel = client.channels.cache.get('989109926200762409');
        logChannel.send({ embeds: [embed] });
    }
};