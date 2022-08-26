const { EmbedBuilder } = require('discord.js');

// Plus de détails sur les messages supprimé
// Message vide quand suppr message d'un bot suite à une slash commande
// Attention au message contenant des embed ou fichier / lien car n'apparait pas

module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(client, message){
        const fetchGuild = await client.getGuild(message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        // console.log(message);
        if (message.author === null) return;


        const embed = new EmbedBuilder()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**Message envoyé par ${message.author} supprimé dans ${message.channel}.**
            ${message.content}
            `)
            .setTimestamp()
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};