const { EmbedBuilder } = require('discord.js');

// A quitter le serveur après combien de temps

module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(client, guild){
        await client.deleteGuild(guild);

        const generalLogChannel = client.channels.cache.get('1013014898810290236');

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .setColor('#c40000')
            .setDescription(`**${client.user} a quitté ce serveur \`${guild.name}\`.**
            `)
            .setTimestamp()
            .setFooter({ text: `Id du serveur : ${guild.id}`, iconURL: guild.iconURL() })
    
        generalLogChannel.send({ embeds: [embed] });
    }
};