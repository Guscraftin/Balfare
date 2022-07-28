const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join', 'thread leave'],
    description: 'Commande concernant les threads',
    options: [
        {
            name: 'join',
            description: "Joindre un thread",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'leave',
            description: "Quitter un thread",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'archive',
            description: "Archiver un thread",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'unarchive',
            description: "Déarchiver un thread",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'delete',
            description: "Supprimer un thread",
            type: ApplicationCommandOptionType.Subcommand,
            options: [ { name: 'channel', type: ApplicationCommandOptionType.String, description: 'ID du channel', required: true } ]
        }
    ],
    async runInteraction (client, interaction) {
        let thread = interaction.channel;
        if (!thread.isThread()) return interaction.reply(`Impossible de taper cette commande car vous n'êtes pas dans un thread !`);

        switch (interaction.options.getSubcommand()) {
            case 'join':
                interaction.reply('Le bot a rejoint le thread !');
                if (thread.joinable) await thread.join();
                break;
            case 'leave':
                interaction.reply('Le bot a quitté le thread !');
                await thread.leave();
                break;
            case 'archive':
                await interaction.reply('Le thread est archivé !');
                await thread.setArchived(true);
                break;
            case 'unarchive':
                await interaction.reply('Le thread est déarchivé !');
                await thread.setArchived(false);
                break;
            case 'delete':
                const channelId = interaction.options.getString('channel');
                const logChannel = client.channels.cache.get(channelId);
                await logChannel.send(`Le bot a supprimé le thread: \`${thread.name}\``);
                await thread.delete();
                break;
        }
    }
};