const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'poll',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'poll [question]',
    examples: ['poll Quelle heure est-il ?'],
    description: 'Poster votre propre sondage!',
    options: [
        {
            name: 'title',
            description: 'Taper le titre de votre sondage',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'content',
            description: 'Taper la question de votre sondage',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async runInteraction (client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new EmbedBuilder()
            .setTitle(pollTitle)
            .setColor('#00a3b5')
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag} !` })

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('<:Yes:989431637873946674>');
        poll.react('❌');
    }
};