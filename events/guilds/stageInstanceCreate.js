const { EmbedBuilder } = require('discord.js');

// Ajouter si relier à un événement - niveau de privacy de la conférence

module.exports = {
    name: 'stageInstanceCreate',
    once: false,
    async execute(client, stageInstance){
        const fetchGuild = await client.getGuild(stageInstance.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setTitle(`Création d'une conférence`)
            .setColor('#009ECA')
            .setDescription(`La conférence \`${stageInstance.topic}\` a été **créée** dans le salon ${stageInstance.channel}.
            `)
            .setTimestamp()
            .setFooter({ text: stageInstance.guild.name, iconURL: stageInstance.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};