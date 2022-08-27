const { EmbedBuilder } = require('discord.js');

// Non test car c'est le compte utilisateur qui doit changer

module.exports = {
    name: 'userUpdate',
    once: false,
    async execute(client, oldUser, newUser){
        const fetchGuild = await client.getGuild(newUser.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        // avatar - banner - Flags (badge)
        // Utile tag avec Discriminant + Peusdo ?

        const embed = new EmbedBuilder()
            .setAuthor({ name: newUser.tag, iconURL: newUser.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`<@${newUser.id}> **a mis à jour son compte.**
            ${oldUser.discriminator !== newUser.discriminator ? `> **Discriminant :** \`${oldUser.discriminator}\` => \`${newUser.discriminator}\`\n` : ``} ${oldUser.tag !== newUser.tag ? `> **Tag :** \`${oldUser.tag}\` => \`${newUser.tag}\`\n` : ``} ${oldUser.username !== newUser.username ? `> **Pseudo :** \`${oldUser.username}\` => \`${newUser.username}\`\n` : ``}
            `)
            .setTimestamp()

        logChannel.send({ embeds: [embed] });
    }
};