const { EmbedBuilder } = require('discord.js');

// Ajouter Plus d'informations sur le message ?
// Notamment qui l'a modif (si possible) + Attention au null au démarrage du bot pour l'ancien message

module.exports = {
    name: 'messageUpdate',
    once: false,
    async execute(client, oldMessage, newMessage){
        const fetchGuild = await client.getGuild(newMessage.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
        .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**Message envoyé par <@${newMessage.author.id}> modifié dans ${newMessage.channel}.**. [Aller au message.](${newMessage.url})
            `)
            .setFields([
                { name: 'Ancien', value: `\`\`\`${oldMessage.content}\`\`\`` },
                { name: 'Nouveau', value: `\`\`\`${newMessage.content}\`\`\`` }
            ])
            .setTimestamp()
            .setFooter({ text: newMessage.guild.name, iconURL: newMessage.guild.iconURL() })
    
        logChannel.send({ embeds: [embed] });
    }
};