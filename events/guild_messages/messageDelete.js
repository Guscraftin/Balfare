const { EmbedBuilder } = require('discord.js');

// Plus de détails sur les messages supprimé (comme qui avait réagit au messages et avec quoi)
// Message vide quand suppr message d'un bot suite à une slash commande (car messge pas dans le cache du bot)
// Attention au message contenant des embed ou fichier / lien car n'apparait pas

// Fix quand suppr le message de création d'un thread

module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(client, message){
        const fetchGuild = await client.getGuild(message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        if (message.author === null) {
            const embedBot = new EmbedBuilder()
                .setTitle(`Suppression d'un message`)
                .setColor('#009ECA')
                .setDescription(`**Message envoyé par \`un membre\` supprimé dans ${message.channel}.**
                `)
                .setTimestamp()
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

            logChannel.send({ embeds: [embedBot] });
        } else {
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
    }
};