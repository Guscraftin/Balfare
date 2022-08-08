const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(client, oldState, newState){
        const fetchGuild = await client.getGuild(newState.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        // Quand (rejoint - Leave) - change channel - Mute / Unmute - Sourdine / Unsourdine
        if (oldState.channel === null) {
            const embedJoin = new EmbedBuilder()
                .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`<@${newState.member.id}> **a rejoint le salon vocal ${newState.channel} ||(\`${newState.channel.name}\`)||.**
                `)
                .setTimestamp()
                .setFooter({ text: newState.guild.name, iconURL: newState.guild.iconURL() })

            logChannel.send({ embeds: [embedJoin] });

        } else if (newState.channel === null) {
            const embedLeave = new EmbedBuilder()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`<@${oldState.member.id}> **a quitté le salon vocal ${oldState.channel} ||(\`${oldState.channel.name}\`)||.**
                `)
                .setTimestamp()
                .setFooter({ text: oldState.guild.name, iconURL: oldState.guild.iconURL() })

            logChannel.send({ embeds: [embedLeave] });
        
        }
    }
};