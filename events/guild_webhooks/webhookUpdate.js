const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'webhookUpdate',
    once: false,
    async execute(client, channel){
        const fetchGuild = await client.getGuild(channel.guild);

        const embed = new EmbedBuilder()
            .setTitle(`Webhook : Mise à jour`)
            .setColor('#009ECA')
            .setDescription(`Un \`webhook\` a été **mis à jour** dans le salon ${resultChannelType()} <#${channel.id}> ||(\`${channel.name}\`)||.`)
            .setTimestamp()
            .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({ embeds: [embed] });


        function resultChannelType() {
            switch (channel.type) {
                case 0 :
                    return `textuel`;
                case 2 :
                    return `vocal`;
                case 5 :
                    return `annonce`;
                default:
                    return ``;
            }
        }

        // Ajouter le nombre de webhooks actuel dans le salon (pour détecter quand suppr)
    }
};