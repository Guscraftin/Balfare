const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'unban [@member] [reason]',
    examples: ['unban 988788257393377280 Erreur'],
    description: 'Débannir un utilisateur avec une raison.',
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à déban",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du déban',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getString('target');
        const reason = interaction.options.getString('reason');

        const userBanList = await interaction.guild.bans.fetch();
        const userToUnban = userBanList.find(x => x.user.id === target || x.user.username === target || x.user.tag === target || `<@!${x.user.id}>` === target);

        if (!userToUnban) return interaction.reply("Ce membre n'est pas banni du serveur !");
        
        interaction.guild.bans.remove(userToUnban.user.id, reason);
        interaction.reply(`Le ${target} a été débanni !`);
    }
};