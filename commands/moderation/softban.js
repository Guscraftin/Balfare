
// Can banish everyone by being Owner

module.exports = {
    name: 'softban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@member] [duration] [reason]',
    examples: ['ban @Alfare 4 Spam', 'ban @Alfare 6 Spam massif'],
    description: 'Bannir un utilisateur temporairement avec une raison.',
    async run (client, message, args) {
        if (!args[0]) return message.reply("Spécifier un membre à ban !");
        if (isNaN(args[1]) || !args[1] || args[1] > 7 || args[1] < 1) return message.reply("Spécifier une durée pour votre ban **(entre 1 et 7 jours)** !")
        if (!args[1]) return message.reply("Spécifier une raison à votre ban !");

        const target = message.mentions.members.find(m => m.id);
        const duration = args[1];
        const reason = args.slice(2).join(' ');

        if (!target.bannable) return message.reply("Ce membre ne peut pas être ban par le bot !");
        
        target.ban({ days: duration, reason: reason });
        message.channel.send(`Le ${target} a été ban pour ${duration} jours !`);
    },
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