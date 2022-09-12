const { EmbedBuilder } = require('discord.js');

// Ajouter la liste des membres qui avaient mis la réaction supprimé

module.exports = {
    name: 'messageReactionRemoveEmoji',
    once: false,
    async execute(client, reaction){
        const fetchGuild = await client.getGuild(reaction.message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: reaction.client.user.username, iconURL: reaction.client.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**La réaction \`${reaction.emoji.name}\` [de ce message](${reaction.message.url}) a été supprimé par le bot <@${reaction.client.user.id}>.**
            `)
            .setTimestamp()
            .setFooter({ text: reaction.message.guild.name, iconURL: reaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};