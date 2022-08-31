const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'warn',
    once: false,
    async execute(client, info){
        const warnLogChannel = client.channels.cache.get('1014524532515680256');

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .setColor('#32c400')
            .setDescription(`**Info : ** \`${info}\``)
            .setTimestamp()
    
        warnLogChannel.send({ embeds: [embed] });
    }
};