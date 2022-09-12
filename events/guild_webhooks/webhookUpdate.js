const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'webhookUpdate',
    once: false,
    async execute(client, channel){
        const fetchGuild = await client.getGuild(channel.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        let numberWebhooks;
        await channel.fetchWebhooks().then(function (hooks) {
            numberWebhooks = hooks.size;
        });

        const embed = new EmbedBuilder()
            .setTitle(`Webhook : Mise à jour`)
            .setColor('#009ECA')
            .setDescription(`Un \`webhook\` a été **mis à jour** dans le salon ${resultChannelType()} <#${channel.id}> ||(\`${channel.name}\`)||.
            > **Nombre de webhooks dans le salon :** \`${numberWebhooks}\`
            `)
            .setTimestamp()
            .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })

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
    }
};