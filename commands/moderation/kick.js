
// Can kick everyone by being Owner

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'kick',
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@member] [reason]',
    examples: ['kick @Alfare Spam'],
    description: 'Kick un utilisateur avec une raison.',
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à kick",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du kick',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.kickable) return interaction.reply("Ce membre ne peut pas être kick par le bot !");
        
        target.kick(reason);
        interaction.reply(`Le ${target} a été kick !`);
    }
};