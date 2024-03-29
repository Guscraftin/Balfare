
// Can banish everyone by being Owner

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@member] [reason]',
    examples: ['ban @Balfare Spam'],
    description: 'Bannir un utilisateur avec une raison.',
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à ban",
            type: ApplicationCommandOptionType.User,
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
        const reason = interaction.options.getString('reason');

        if (!target.bannable) return interaction.reply("Ce membre ne peut pas être ban par le bot !");
        
        target.ban({ reason });
        interaction.reply(`Le ${target} a été ban !`);
    }
};