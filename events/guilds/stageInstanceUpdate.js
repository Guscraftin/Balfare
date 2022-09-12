const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stageInstanceUpdate',
    once: false,
    async execute(client, oldStageInstance, newStageInstance){
        const fetchGuild = await client.getGuild(newStageInstance.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        const embed = new EmbedBuilder()
            .setTitle(`Modification d'une conférence`)
            .setColor('#009ECA')
            .setDescription(`**La conférence \`${newStageInstance.topic}\` a été modifiée dans le salon ${newStageInstance.channel}.**
            > **Sujet :** \`${oldStageInstance.topic}\` => \`${newStageInstance.topic}\`
            `)
            .setTimestamp()
            .setFooter({ text: newStageInstance.guild.name, iconURL: newStageInstance.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};