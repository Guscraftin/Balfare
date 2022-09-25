const { EmbedBuilder } = require('discord.js');

// Fix demande de parole dans stage dans embedDeaf:
// ${oldState.requestToSpeakTimestamp !== 0 && newState.requestToSpeakTimestamp === null ? `> ✋ **Demande la parole dans Stage :** \`Oui\` => \`Non\`\n` : ``} ${oldState.requestToSpeakTimestamp === null && newState.requestToSpeakTimestamp !== 0 ? `> ✋ **Demande la parole dans Stage :** \`Non\` => \`Oui\`` : ``}

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(client, oldState, newState){
        const fetchGuild = await client.getGuild(newState.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

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
        
        } else if (oldState.channelId != newState.channelId) {
            const embedMove = new EmbedBuilder()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`<@${oldState.member.id}> **a changé de salon vocal ${oldState.channel} => ${newState.channel}.**
                ||(\`${oldState.channel.name}\` => \`${newState.channel.name}\`)||
                `)
                .setTimestamp()
                .setFooter({ text: oldState.guild.name, iconURL: oldState.guild.iconURL() })

            logChannel.send({ embeds: [embedMove] });

        } else {
            const embedDeaf = new EmbedBuilder()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`**Le statut du micro de <@${oldState.member.id}> à été mis à jour dans le salon vocal ${oldState.channel} ||(\`${oldState.channel.name}\`)||.**
                ${!oldState.selfMute && newState.selfMute ? `> 🎙 **Muet :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.selfMute && !newState.selfMute ? `> 🎙 **Muet :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.selfDeaf && newState.selfDeaf ? `> 🔈 **Sourd :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.selfDeaf && !newState.selfDeaf ? `> 🔈 **Sourd :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.serverMute && newState.serverMute ? `> 🎙 **Muet par un modo :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.serverMute && !newState.serverMute ? `> 🎙 **Muet par un modo :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.serverDeaf && newState.serverDeaf ? `> 🔈 **Sourd par un modo :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.serverDeaf && !newState.serverDeaf ? `> 🔈 **Sourd par un modo :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.selfVideo && newState.selfVideo ? `> 📷 **Camera :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.selfVideo && !newState.selfVideo ? `> 📷 **Camera :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.streaming && newState.streaming ? `> 📺 **Partage d'écran :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.streaming && !newState.streaming ? `> 📺 **Partage d'écran :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.suppress && newState.suppress ? `> 📣 **Muet dans Stage :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.suppress && !newState.suppress ? `> 📣 **Muet dans Stage :** \`Activé\` => \`Désactivé\`\n` : ``}
                `)
                .setTimestamp()
                .setFooter({ text: oldState.guild.name, iconURL: oldState.guild.iconURL() })

            logChannel.send({ embeds: [embedDeaf] });

        } 
    }
};