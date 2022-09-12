const { EmbedBuilder } = require('discord.js');

// Ajouter la liste des membres qui avaient mis les réactions supprimées

module.exports = {
    name: 'messageReactionRemoveAll',
    once: false,
    async execute(client, message, reactions){
        const fetchGuild = await client.getGuild(message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: reactions.first().client.user.username, iconURL: reactions.first().client.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**Les réactions \`${getNameEmojis()}\` [de ce message](${message.url}) ont été supprimé par le bot <@${reactions.first().client.user.id}>.**
            `)
            .setTimestamp()
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });


        function getNameEmojis() {
            let listEmoji = [];
            reactions.each(emoji => listEmoji.push(emoji.emoji.name));
            return listEmoji;
        }
    }
};