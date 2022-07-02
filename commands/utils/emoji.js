module.exports = {
    name: 'emoji',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'emoji',
    examples: ['emoji'],
    description: 'Poster vos emojis!',
    async run (client, message, args) {
        const poll = await message.reply('Emoji');
        await poll.react('🟥');
        await poll.react('🟩');
        await poll.react('🟦');
        await poll.react('🟧');
    },
    async runInteraction (client, interaction) {
        const poll = await interaction.reply({ content: 'emoji', fetchReply: true });
        await poll.react('🟥');
        await poll.react('🟩');
        await poll.react('🟦');
        await poll.react('🟧');
    }
};