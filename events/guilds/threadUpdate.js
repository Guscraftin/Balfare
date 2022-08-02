module.exports = {
    name: 'threadUpdate',
    once: false,
    async execute(client, oldThread, newThread){
        const fetchGuild = await client.getGuild(newThread.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        if (oldThread.archived && !newThread.archived) newThread.join();
        
        if (oldThread.name != newThread.name) logChannel.send(`Modification du nom d'un thread: \`${oldThread.name}\` -> \`${newThread.name}\` !\nDans le salon ${newThread.parent} avec le thread <#${newThread.id}>`);

        if (!oldThread.locked && newThread.locked) logChannel.send(`Verouillage du thread \`${newThread.name}\` par le modérateur \`???\` !\nDans le salon : ${newThread.parent} avec le thread <#${newThread.id}>`);

        if (oldThread.locked && !newThread.locked) logChannel.send(`Déverouillage du thread \`${newThread.name}\` par le modérateur \`???\` !\nDans le salon : ${newThread.parent} avec le thread <#${newThread.id}>`);

        if (oldThread.autoArchiveDuration != newThread.autoArchiveDuration) logChannel.send(`Modification du verouillage automatique du thread \`${newThread.name}\` par le modérateur \`???\` : \`${oldThread.autoArchiveDuration/60}h\` -> \`${newThread.autoArchiveDuration/60}h\` !\nDans le salon : ${newThread.parent} avec le thread <#${newThread.id}>`);

        if (oldThread.rateLimitPerUser != newThread.rateLimitPerUser) logChannel.send(`Modification du slownmode du thread \`${newThread.name}\` par le modérateur \`???\` : \`${oldThread.rateLimitPerUser}s\` -> \`${newThread.rateLimitPerUser}s\` !\nDans le salon : ${newThread.parent} avec le thread <#${newThread.id}>`);

        
        // Delete thread
    }
};