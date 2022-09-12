const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stageInstanceCreate',
    once: false,
    async execute(client, stageInstance){
        const fetchGuild = await client.getGuild(stageInstance.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'une conférence`)
            .setColor('#009ECA')
            .setDescription(`La conférence \`${stageInstance.topic}\` a été **créée** dans le salon ${stageInstance.channel}.
            ${stageInstance.guildScheduledEvent != null ? `> **Evenement lié :** [${stageInstance.guildScheduledEvent.name}](${stageInstance.guildScheduledEvent})` : ``}
            `)
            .setTimestamp()
            .setFooter({ text: stageInstance.guild.name, iconURL: stageInstance.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};