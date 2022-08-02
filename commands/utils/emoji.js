module.exports = {
    name: 'emoji',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'emoji',
    examples: ['emoji'],
    description: 'Poster vos emojis!',
    async runInteraction (client, interaction) {
        const poll = await interaction.reply({ content: '**Rouge:** Supprime message\n**Vert:** Envoie message\n**Bleu:** Retire toutes les réactions\n**Orange:** Envoie un DM', fetchReply: true });
        await poll.react('🟥');
        await poll.react('🟩');
        await poll.react('🟦');
        await poll.react('🟧');
    }
};