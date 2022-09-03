const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageReactionRemove',
    once: false,
    async execute(client, messageReaction, user){
        const fetchGuild = await client.getGuild(messageReaction.message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        const emojiName = messageReaction.emoji.name;
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**<@${user.id}> a retiré sa réaction ${isDefaultEmoji() ? `\`${messageReaction.emoji.name}\`` : `<:${messageReaction.emoji.name}:${messageReaction.emoji.id}>`} [à ce message](${messageReaction.message.url}).**
            `)
            .setTimestamp()
            .setFooter({ text: messageReaction.message.guild.name, iconURL: messageReaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });

        function isDefaultEmoji() {
            let listTest = emojiName.match(/[0-9a-z_]/gi);
            if (listTest === null) listTest = [];

            return listTest.length != emojiName.length;
        }
    }
};