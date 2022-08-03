const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threadMembersUpdate',
    once: false,
    async execute(client, addedMembers, removedMembers, thread){
        const fetchGuild = await client.getGuild(thread.guild);

        const embed = new EmbedBuilder()
            .setTitle(`Thread : Membre`)
            .setColor('#009ECA')
            .setDescription(`La liste des membres du thread ${thread.type === ChannelType.GuildPublicThread ? `public` : `privé`} <#${thread.id}> (\`${thread.name}\`) a été **mis à jour** dans le salon ${thread.parent}.
            ${ addedMembers.size > 0 ? `> ✅ : <@${addedMembers.firstKey()}>` : ``} ${ removedMembers.size > 0 ? `> ❌ : <@${removedMembers.firstKey()}>` : ``}
            `)
            .setTimestamp()
            .setFooter({ text: thread.guild.name, iconURL: thread.guild.iconURL() })

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({ embeds: [embed] });
    }
};