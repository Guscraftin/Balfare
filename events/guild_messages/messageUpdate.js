const { EmbedBuilder } = require('discord.js');

// Ajouter Plus d'informations sur le message ?
// Attention au null au démarrage du bot pour l'ancien message [non résolu]
// **Attention** à la longueur maximum de message (afficher que le début) car renvoie des erreurs
// Attention au message contenant des embed ou fichier / lien car n'apparait pas

module.exports = {
    name: 'messageUpdate',
    once: false,
    async execute(client, oldMessage, newMessage){
        const fetchGuild = await client.getGuild(newMessage.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const oldContentMessage = oldMessage.content;
        const newContentMessage = newMessage.content;

        if (oldMessage.channelId === logChannel.id) return;

        let embed = new EmbedBuilder()
            .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
            .setColor('#009ECA')
            .setTimestamp()
            .setFooter({ text: newMessage.guild.name, iconURL: newMessage.guild.iconURL() })

        // Logs for pinned messages
        if (oldMessage.pinned != newMessage.pinned) {
            embed
                .setDescription(`**Message envoyé par <@${newMessage.author.id}> ${newMessage.pinned === true ? "épinglé" : "désépinglé"} dans ${newMessage.channel}.** [Aller au message.](${newMessage.url})
                `)

        } // Logs for edited messages
        else if ((oldContentMessage === null || oldContentMessage.length <= 1024) && newContentMessage.length <= 1024) {
            embed
                .setDescription(`**Message envoyé par <@${newMessage.author.id}> modifié dans ${newMessage.channel}.** [Aller au message.](${newMessage.url})
                `)
                .addFields([
                    {name: `\`🔅\` - Ancien - \`🔅\``, value: `\`\`\`${oldContentMessage}\`\`\``},
                    {name: `\`🔅\` - Nouveau - \`🔅\``, value: `\`\`\`${newContentMessage}\`\`\``}
                ])

        } else { return; }

        logChannel.send({ embeds: [embed] });
    }
};