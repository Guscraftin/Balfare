const { EmbedBuilder } = require('discord.js');

// Utile ?

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message){
        // const fetchGuild = await client.getGuild(message.guild);
        // const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        // if (logChannel == undefined) return;

        // if (message.channel === logChannel) return;

        // const embed = new EmbedBuilder()
        //     .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
        //     .setColor('#009ECA')
        //     .setDescription(`**Message envoyé par ${message.author} dans ${message.channel}.**
        //     ${message.content}
        //     `)
        //     .setTimestamp()
        //     .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

        // logChannel.send({ embeds: [embed] });
    }
};