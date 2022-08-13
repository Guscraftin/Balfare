const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'threadUpdate',
    once: false,
    async execute(client, oldThread, newThread){
        const fetchGuild = await client.getGuild(newThread.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        

        const embedModif = new EmbedBuilder()
            .setTitle(`Modification d'un thread`)
            .setColor('#009ECA')
            .setDescription(`Le thread ${oldThread.type === ChannelType.GuildPublicThread ? `public` : `privé`} <#${oldThread.id}> (\`${oldThread.name}\`) **a été modifié** dans le salon ${newThread.parent} par un modérateur !
            ${oldThread.name != newThread.name ? `> **Nom :** \`${oldThread.name}\` => \`${newThread.name}\`\n` : `` } ${oldThread.rateLimitPerUser != newThread.rateLimitPerUser ? `> **Mode lent :** \`${resultRateLimit(oldThread)}\` => \`${resultRateLimit(newThread)}\`\n` : ``} ${oldThread.autoArchiveDuration != newThread.autoArchiveDuration ? `> **Archivage après une période d'inactivité :** \`${resultAutoArchive(oldThread)}\` => \`${resultAutoArchive(newThread)}\`\n` : ``} ${!oldThread.locked && newThread.locked ? `> **Verouillage :** \`Désactivé\` => \`Activé\`` : ``} ${oldThread.locked && !newThread.locked ? `> **Verouillage :** \`Activé\` => \`Désactivé\`` : ``}
            `)
            .setTimestamp()
            .setFooter({ text: newThread.guild.name, iconURL: newThread.guild.iconURL() })


        const embedArchiv = new EmbedBuilder()
            .setTitle(`Thread archivé`)
            .setColor('#009ECA')
            .setDescription(`Le thread ${oldThread.type === ChannelType.GuildPublicThread ? `public` : `privé`} <#${oldThread.id}> (\`${oldThread.name}\`) a été **archivé** dans le salon ${newThread.parent} ${!oldThread.locked && newThread.locked ? `par un __modérateur__` : ``} !
            `)
            .setTimestamp()
            .setFooter({ text: newThread.guild.name, iconURL: newThread.guild.iconURL() })

        const embedDeArchiv = new EmbedBuilder()
            .setTitle(`Thread déarchivé`)
            .setColor('#009ECA')
            .setDescription(`Le thread ${oldThread.type === ChannelType.GuildPublicThread ? `public` : `privé`} <#${oldThread.id}> (\`${oldThread.name}\`) a été **déarchivé** dans le salon ${newThread.parent} !
            *Tout le monde peut désarchiver ce fil de discussion.*
            `)
            .setTimestamp()
            .setFooter({ text: newThread.guild.name, iconURL: newThread.guild.iconURL() })


        if (!oldThread.archived && newThread.archived) logChannel.send({ embeds: [embedArchiv] });
        else if (oldThread.archived && !newThread.archived) {
            newThread.join()
            logChannel.send({ embeds: [embedDeArchiv] });
        } else {
            logChannel.send({ embeds: [embedModif] });
        }


        // For EmbedModif
        function resultAutoArchive(threadRef) {
            if (threadRef.autoArchiveDuration < 60) {
                return `${threadRef.autoArchiveDuration} minutes`;
            }
            else if (threadRef.autoArchiveDuration === 60) {
                return `1 heure`;
            }
            else if (threadRef.autoArchiveDuration <= 1440) {
                return `${threadRef.autoArchiveDuration/60} heures`;
            }
            else if (threadRef.autoArchiveDuration < 10080) {
                return `${threadRef.autoArchiveDuration/1440} jours`;
            }
            else if (threadRef.autoArchiveDuration === 10080) {
                return `1 semaine`;
            }
            else {
                return `${threadRef.autoArchiveDuration/10080} semaines`;
            }
        } 

        function resultRateLimit(threadRef) {
            if (threadRef.rateLimitPerUser === 0) {
                return `Désactivé`;
            }
            else if (threadRef.rateLimitPerUser < 60) {
                return `${threadRef.rateLimitPerUser} secondes`;
            }
            else if (threadRef.rateLimitPerUser === 60) {
                return `1 minute`;
            }
            else if (threadRef.rateLimitPerUser < 3600) {
                return `${threadRef.rateLimitPerUser/60} minutes`;
            }
            else if (threadRef.rateLimitPerUser === 3600) {
                return `1 heure`;
            }
            else if (threadRef.rateLimitPerUser < 86400) {
                return `${threadRef.rateLimitPerUser/3600} heures`;
            }
            else {
                return `${threadRef.rateLimitPerUser/86400} jours`;
            }
        }
    }
};