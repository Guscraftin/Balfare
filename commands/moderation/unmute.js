// Can unmute everyone by being Owner

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@member]',
    examples: ['unmute @Balfare'],
    description: 'Démute un utilisateur.',
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à démute",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getMember('target');

        if (!target.isCommunicationDisabled()) return interaction.reply("Ce membre ne peut pas être démute par le bot car il n'est pas mute !");
        
        target.timeout(null);
        interaction.reply(`Le membre ${target} a été démute !`);
    }
};