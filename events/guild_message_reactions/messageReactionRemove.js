const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageReactionRemove',
    once: false,
    async execute(client, messageReaction, user){
        const fetchGuild = await client.getGuild(messageReaction.message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**<@${user.id}> a retiré sa réaction \`${messageReaction.emoji.name}\` [de ce message](${messageReaction.message.url}).**
            `)
            .setTimestamp()
            .setFooter({ text: messageReaction.message.guild.name, iconURL: messageReaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};