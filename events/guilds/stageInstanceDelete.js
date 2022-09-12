const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stageInstanceDelete',
    once: false,
    async execute(client, stageInstance){
        const fetchGuild = await client.getGuild(stageInstance.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Suppression d'une conférence`)
            .setColor('#009ECA')
            .setDescription(`La conférence \`${stageInstance.topic}\` a été **terminée** dans le salon ${stageInstance.channel}.
            ${stageInstance.guildScheduledEvent != null ? `> **Evenement lié :** [${stageInstance.guildScheduledEvent.name}](${stageInstance.guildScheduledEvent})` : ``}
            `)
            .setTimestamp()
            .setFooter({ text: stageInstance.guild.name, iconURL: stageInstance.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};