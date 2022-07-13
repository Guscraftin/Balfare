
// Can banish everyone by being Owner

module.exports = {
    name: 'softban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@member] [duration] [reason]',
    examples: ['ban @Alfare 4 Spam', 'ban @Alfare 6 Spam massif'],
    description: 'Bannir un utilisateur temporairement avec une raison.',
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à ban",
            type: 'USER',
            required: true
        },
        {
            name: 'duration',
            description: 'La durée du ban (en jours)',
            type: 'NUMBER',
            minValue: 1,
            maxValue: 7,
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du ban',
            type: 'STRING',
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