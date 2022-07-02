module.exports = {
    name: 'messageReactionAdd',
    once: false,
    execute(client, messageReaction, user){
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
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
        }
    }
};