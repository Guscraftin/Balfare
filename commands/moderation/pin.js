const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'pin',
    category: 'moderation',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'pin [message_id]',
    examples: ['pin 1086943757330555050'],
    description: 'Epingler un message.',
    options: [
        {
            name: 'message_id',
            description: "Entrez l'id du message à désépingler",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        /*
         * Pin a message without permission in specific guild
         */
        const messageId = interaction.options.getString('message_id');
        
        // Only available in "Dorset Dublin S4" guild
        if (interaction.guildId !== "1052648075501510736") return interaction.reply({ content: "Cette commande n'est pas disponible sur ce serveur !", ephemeral: true });

        const message = await interaction.channel.messages.fetch(messageId).catch(() => {});
        if (!message) return interaction.reply({ content: "Le message n'a pas été trouvé !", ephemeral: true });
        if (message.pinned) return interaction.reply({ content: "Le message est déjà épinglé !", ephemeral: true });

        return message.pin().then(interaction.reply({ content: `Le [message](${message.url}) a bien été épinglé !`, ephemeral: true }));
    }
};