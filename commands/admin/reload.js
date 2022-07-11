module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    examples: ['reload'],
    description: 'Relancer le bot!',
    async run (client, message, args) {
        // const devGuild = await client.guilds.cache.get('746002648506826793');
        // devGuild.commands.set(client.commands.map(cmd => cmd));
        await message.reply('Bot relancé avec succès !');
        return process.exit();
    },
    async runInteraction (client, interaction) {
        // const devGuild = await client.guilds.cache.get('746002648506826793');
        // devGuild.commands.set(client.commands.map(cmd => cmd));
        await interaction.reply('Bot relancé avec succès !');
        return process.exit();
    }
};