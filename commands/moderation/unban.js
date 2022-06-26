module.exports = {
    name: 'unban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'unban [@member] [reason]',
    examples: ['unban 988788257393377280 Erreur'],
    description: 'Débannir un utilisateur avec une raison.',
    async run (client, message, args) {
        if (!args[0]) return message.reply("Spécifier un membre à débannir !");
        if (!args[1]) return message.reply("Spécifier une raison à votre débannir !");

        var user = args[0];
        try { 
            user = await client.users.fetch(args[0]);
        } catch {
            return message.reply("Veuillez entrer l'**ID** de l'utilisateur à déban !");
        };
        if (!user) return message.reply("Ce membre n'est pas banni du serveur !");
        
        message.guild.members.unban(user);
        message.channel.send(`Le ${user} a été débanni !`);
    },
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à déban",
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du déban',
            type: 'STRING',
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