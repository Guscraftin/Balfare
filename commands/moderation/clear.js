const { ApplicationCommandOptionType } = require('discord.js');

// Suppre le message de confirmation après un certain temps (comme 10 sec)

module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [amount] <@target>',
    examples: ['clear 50', 'clear 50 @Alfare'],
    description: 'Supprimer un nombre de message spécifié sur un salon ou un utilisateur.',
    options: [
        {
            name: 'message',
            description: 'Le nombre de message à supprimer',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'target',
            description: "Sélectionner l'utilisateur pour la suppresion des messages",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    async runInteraction (client, interaction) {
        const amountToDelete = interaction.options.getNumber('message');
        if (isNaN(amountToDelete) || amountToDelete > 100 || amountToDelete < 2) return interaction.reply("Le `NOMBRE` doit être entre 2 et 100 inclus !")
        const target = interaction.options.getMember('target');

        const messagesToDelete = await interaction.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur l'utilisateur ${target} !`);
            })
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur ce salon !`);
            })
        }
    }
};