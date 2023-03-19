
// Can banish everyone by being Owner

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'softban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@member] [duration] [reason]',
    examples: ['ban @Balfare 4 Spam', 'ban @Balfare 6 Spam massif'],
    description: 'Bannir un utilisateur temporairement avec une raison.',
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à ban",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'duration',
            description: 'La durée du ban (en jours)',
            type: ApplicationCommandOptionType.Number,
            minValue: 1,
            maxValue: 7,
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du ban',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getMember('target');
        const duration = interaction.options.getNumber('duration');
        const reason = interaction.options.getString('reason');

        if (!target.bannable) return interaction.reply("Ce membre ne peut pas être ban par le bot !");
        
        target.ban({ days: duration, reason: reason });
        interaction.reply(`Le ${target} a été ban pour ${duration} jours !`);
    }
};