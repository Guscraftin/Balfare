const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'emit',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'emit [eventName]',
    examples: ['emit guildMemberAdd'],
    description: 'Emettre un événement au choix pour les tests!',
    options: [
        {
            name: 'event',
            description: 'Choisir un événement à emettre',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate'
                }
            ]
        }
    ],
    runInteraction (client, interaction) {
        const eventChoices = interaction.options.getString('event');

        if (eventChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event guildMemberAdd émit !', ephemeral: true });
        } else if (eventChoices == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({ content: 'Event guildCreate émit !', ephemeral: true });
        } else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event guildMemberRemove émit !', ephemeral: true });
        }
    }
};