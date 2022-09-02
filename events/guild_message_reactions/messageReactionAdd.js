const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(client, messageReaction, user){
        const fetchGuild = await client.getGuild(messageReaction.message.guild);
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        if (logChannel == undefined) return;
        const emojiName = messageReaction.emoji.name;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**<@${user.id}> a ajouté sa réaction ${isDefaultEmoji() ? `\`${messageReaction.emoji.name}\`` : `<:${messageReaction.emoji.name}:${messageReaction.emoji.id}>`} [à ce message](${messageReaction.message.url}).**
            `)
            .setTimestamp()
            .setFooter({ text: messageReaction.message.guild.name, iconURL: messageReaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });

        function isDefaultEmoji() {
            // Marche mais pas opti

            let listLetter = emojiName.match(/[a-z]/gi);
            let listNumber = emojiName.match(/[0-9]/gi);
            let listTiret = emojiName.match(/_/gi);
            if (listLetter === null) listLetter = [];
            if (listNumber === null) listNumber = [];
            if (listTiret === null) listTiret = [];
            const listCorrect = listLetter.concat(listNumber).concat(listTiret);
            
            return listCorrect.length != emojiName.length;
        }


        const message = messageReaction.message;
        const member = message.guild.members.cache.get(user.id);
        if (member.user.bot) return;

        if (messageReaction.partial){
            try {
                await messageReaction.fetch();
            } catch (error) {
                console.log('Impossible de récuperer les messages !');
                return;
            }
        }

        switch (emojiName) {
            case '🟥':
                message.delete();
                break;
            case '🟦':
                message.reactions.removeAll();
                break;
            case '🟩':
                message.channel.send('Je suis le carré vert: 🟩 !');
                break;
            case '🟧':
                member.send('Salut !');
                break;
            case '🟨':
                message.reactions.resolve(messageReaction.remove());
                break;
        }
    }
};