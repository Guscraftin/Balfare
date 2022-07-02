
// Can banish everyone by being Owner

module.exports = {
    name: 'unlock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'unlock',
    examples: ['unlock'],
    description: 'Déverrouiler un salon.',
    async run (client, message, args) {
        await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true });
        await message.reply({ content: "Le salon est déverrouillé !" });
    },
    async runInteraction (client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true });
        await interaction.reply({ content: "Le salon est déverrouillé !", ephemeral: true });
    }
};