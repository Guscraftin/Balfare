const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'presenceUpdate',
    once: false,
    async execute(client, oldPresence, newPresence){
        const fetchGuild = await client.getGuild(newPresence.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;

        if (newPresence.user.bot) return;
        const oldCustomStatus = oldPresence.activities.find((activitie) => activitie.name === 'Custom Status');
        const newCustomStatus = newPresence.activities.find((activitie) => activitie.name === 'Custom Status');
        if (oldCustomStatus !== undefined && newCustomStatus !== undefined && oldCustomStatus.state === newCustomStatus.state) return;
        if (oldCustomStatus === undefined && newCustomStatus === undefined) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: newPresence.user.tag, iconURL: newPresence.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setThumbnail(newPresence.user.displayAvatarURL())
            .setDescription(`${newPresence.user} **a mis à jour son status personnalié.**
            > **Status :** \`${oldCustomStatus !== undefined ? oldCustomStatus.state : `null`}\` => \`${newCustomStatus !== undefined ? newCustomStatus.state : `null`}\`
            ${whatStateEmoji()}
            `)
            .setTimestamp()
            .setFooter({ text: newPresence.guild.name, iconURL: newPresence.guild.iconURL() })
    
        logChannel.send({ embeds: [embed] });


        function whatStateEmoji() {
            if (oldCustomStatus === undefined) {
                if (newCustomStatus.emoji === null) return ``;
                return `> **Emoji associé :** \`null\` => ${isDefaultEmoji(true) ? `\`${newCustomStatus.emoji.name}\`` : `<:${newCustomStatus.emoji.name}:${newCustomStatus.emoji.id}>`}`;
            } else if (newCustomStatus === undefined) {
                if (oldCustomStatus.emoji === null) return ``;
                return `> **Emoji associé :** ${isDefaultEmoji(false) ? `\`${oldCustomStatus.emoji.name}\`` : `<:${oldCustomStatus.emoji.name}:${oldCustomStatus.emoji.id}>`} => \`null\``;
            } else {
                if (oldCustomStatus.emoji === null && newCustomStatus.emoji === null) return ``;
                if (oldCustomStatus.emoji === null) return `> **Emoji associé :** \`null\` => ${isDefaultEmoji(true) ? `\`${newCustomStatus.emoji.name}\`` : `<:${newCustomStatus.emoji.name}:${newCustomStatus.emoji.id}>`}`;
                else if (newCustomStatus.emoji === null) return `> **Emoji associé :** ${isDefaultEmoji(false) ? `\`${oldCustomStatus.emoji.name}\`` : `<:${oldCustomStatus.emoji.name}:${oldCustomStatus.emoji.id}>`} => \`null\``;
                else return oldCustomStatus.emoji.name != newCustomStatus.emoji.name ? `> **Emoji associé :** ${isDefaultEmoji(false) ? `\`${oldCustomStatus.emoji.name}\`` : `<:${oldCustomStatus.emoji.name}:${oldCustomStatus.emoji.id}>`} => ${isDefaultEmoji(true) ? `\`${newCustomStatus.emoji.name}\`` : `<:${newCustomStatus.emoji.name}:${newCustomStatus.emoji.id}>`}` : ``;
            }
        }

        function isDefaultEmoji(status) {
            let testEmojiName;
            if (status) {
                const newEmojiName = newCustomStatus.emoji.name;
                testEmojiName = newEmojiName.match(/[0-9a-z_]/gi);
                if (testEmojiName === null) testEmojiName = [];
                return testEmojiName.length != newEmojiName.length;
            }
            else {
                const oldEmojiName = oldCustomStatus.emoji.name;
                testEmojiName = oldEmojiName.match(/[0-9a-z_]/gi);
                if (testEmojiName === null) testEmojiName = [];
                return testEmojiName.length != oldEmojiName.length;
            }
        }
    }
};