const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Bouton sous log pour kick le bot (si mauvais serveur) => Faire une whitelist ?

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client, guild){
        await client.createGuild(guild);

        const generalLogChannel = client.channels.cache.get('1013014898810290236');

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .setColor('#32c400')
            .setDescription(`**${client.user} a rejoint le serveur \`${guild.name}\`.**
            > **Rejoint le :** <t:${parseInt(guild.joinedTimestamp / 1000)}:f> (<t:${parseInt(guild.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: `Id du serveur : ${guild.id}`, iconURL: guild.iconURL() })
    
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('invitation')
                    .setEmoji('📨')
                    .setLabel('Invitation')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('kicker')
                    .setEmoji('👋')
                    .setLabel('Quitter')
                    .setStyle(ButtonStyle.Danger)
            )

        generalLogChannel.send({ embeds: [embed], components: [buttons] });
    }
};