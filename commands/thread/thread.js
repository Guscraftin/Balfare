module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join', 'thread leave'],
    description: 'Commande concernant les threads',
    async run (client, message, args) {
        let thread = message.channel;
        if (!thread.isThread()) return message.reply(`Impossible de taper cette commande car vous n'êtes pas dans un thread !`);

        if (!args[0] || !args[0].match(/^(join|leave|archive|unarchive|delete)$/)) return message.reply("Merci d'entrer une sous-commande valide (`join`/`leave`/`archive`/`unarchive`/`delete`) !");

        switch (args[0]) {
            case 'join':
                message.reply('Le bot a rejoint le thread !');
                if (thread.joinable) await thread.join();
                break;
            case 'leave':
                message.reply('Le bot a quitté le thread !');
                await thread.leave();
                break;
            case 'archive':
                message.reply('Le thread est archivé !');
                await thread.setArchived(true);
                break;
            case 'unarchive':
                message.reply('Le thread est déarchivé !');
                await thread.setArchived(false);
                break;
            case 'delete':
                const channelId = args[1];
                if (!args[1]) return message.reply(`Merci de spécifier un ID de channel !`);
                const logChannel = client.channels.cache.get(channelId);
                await logChannel.send(`Le bot a supprimé le thread: ${thread.name}`);
                await thread.delete();
                break;
        }
    },
    options: [
        {
            name: 'join',
            description: "Joindre un thread",
            type: 'SUB_COMMAND'
        },
        {
            name: 'leave',
            description: "Quitter un thread",
            type: 'SUB_COMMAND'
        },
        {
            name: 'archive',
            description: "Archiver un thread",
            type: 'SUB_COMMAND'
        },
        {
            name: 'unarchive',
            description: "Déarchiver un thread",
            type: 'SUB_COMMAND'
        },
        {
            name: 'delete',
            description: "Supprimer un thread",
            type: 'SUB_COMMAND',
            options: [ { name: 'channel', type: 'STRING', description: 'ID du channel', required: true } ]
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