const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(client, guild){
        await client.deleteGuild(guild);

        const generalLogChannel = client.channels.cache.get('1013014898810290236');
        let message;

        await generalLogChannel.messages.fetch({ limit: 1 }).then(function (messages) {
            message = messages.filter(m => m.embeds[0].footer.text.slice(16) === guild.id).at(0);
        });

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .setColor('#c40000')
            .setDescription(`**${client.user} a quitté le serveur \`${guild.name}\`.**
            > **Rejoint le :** <t:${parseInt(guild.joinedTimestamp / 1000)}:f> (<t:${parseInt(guild.joinedTimestamp / 1000)}:R>)
            > **Quitté le :** <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: `Id du serveur : ${guild.id}`, iconURL: guild.iconURL() })
    
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('invitation')
                    .setEmoji('📨')
                    .setLabel('Invitation')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('kicker')
                    .setEmoji('👋')
                    .setLabel('Quitter')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger)
            )

        message.edit({ embeds: [embed], components: [buttons] });
    }
};