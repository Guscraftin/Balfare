const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Poster votre propre sondage!',
    async run (client, message, args) {
        if (!args[0]) return message.reply("Merci d'entrer une question pour votre sondage !");

        const embed = new MessageEmbed()
            .setTitle('Sondage')
            .setColor('#00a3b5')
            .setDescription(args.slice(0).join(' '))
            .setTimestamp()
            .setFooter({ text: `Nouveau sondage généré par ${message.author.tag} !` })

        const poll = await message.reply({ embeds: [embed] });
        poll.react('<:Yes:989431637873946674>');
        poll.react('❌');
    },
    options: [
        {
            name: 'title',
            description: 'Taper le titre de votre sondage',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Taper la question de votre sondage',
            type: 'STRING',
            required: true,
        }
    ],
    async runSlash (client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
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