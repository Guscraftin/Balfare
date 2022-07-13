module.exports = {
    name: 'slowmode',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'slowmode [amount_in_second]',
    examples: ['slowmode 15', 'slowmode 0'],
    description: 'Ajouter un ratelimit (slowmode) sur le salon.',
    async run (client, message, args) {
        const value = args[0];
        if (!args[0] || isNaN(value)) return message.reply("Merci d'entrer un `NOMBRE` pour indiquer la durée du slowmode !");
        
        if (value == 0) {
            await message.channel.setRateLimitPerUser(0);
            return message.reply({ content: `Le slowmode est désactivé !` });
        } else {
            await message.channel.setRateLimitPerUser(value);
            return message.reply({ content: `Le slowmode est activé -> \`${value}\` !` });
        }
    },
    options: [
        {
            name: 'value',
            description: 'Choisir la valeur du slowmode',
            type: 'NUMBER',
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const value = interaction.options.getNumber('value');

        if (value == 0) {
            await interaction.channel.setRateLimitPerUser(0);
            return interaction.reply({ content: `Le slowmode est désactivé !`, ephemeral: true });
        } else {
            await interaction.channel.setRateLimitPerUser(value);
            return interaction.reply({ content: `Le slowmode est activé -> \`${value}\` !`, ephemeral: true });
        }
    }
};