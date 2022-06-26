const { MessageEmbed } = require('discord.js');

// Can kick everyone by being Owner

module.exports = {
    name: 'kick',
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@member] [reason]',
    examples: ['kick @Alfare', 'kick @Alfare Spam'],
    description: 'Kick un utilisateur avec une raison.',
    async run (client, message, args) {
        if (!args[0]) return message.reply("Spécifier un membre à kick !");
        if (!args[1]) return message.reply("Spécifier une raison à votre kick !");

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if (!target.kickable) return message.reply("Ce membre ne peut pas être kick par le bot !");
        
        target.kick(reason);
        message.channel.send(`Le ${target} a été kick !`);
    },
    options: [
        {
            name: 'target',
            description: "Sélectionner l'utilisateur à kick",
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'La raison du kick',
            type: 'STRING',
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.kickable) return interaction.reply("Ce membre ne peut pas être kick par le bot !");
        
        target.kick(reason);
        interaction.reply(`Le ${target} a été kick !`);
    }
};