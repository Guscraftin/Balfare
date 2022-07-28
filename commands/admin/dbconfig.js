const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'dbconfig [key] <value>',
    examples: ['dbconfig', 'dbconfig logChannel 98643278956379287', 'dbconfig logChannel'],
    description: 'Configurer les données de la base de donnée !',
    options: [
        {
            name: 'key',
            description: 'Choisir une clé à modifier ou afficher',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'logChannel',
                    value: 'logChannel'
                },
                {
                    name: 'testChannel',
                    value: 'testChannel'
                }
            ]
        },
        {
            name: 'value',
            description: 'Choisir la nouvelle valeur pour votre clé',
            type: ApplicationCommandOptionType.String
        }
    ],
    async runInteraction (client, interaction, guildSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');

        if (key == 'logChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { logChannel: value });
                return interaction.reply({ content: `Nouvelle valeur de logChannel: \`${value}\``});
            }
            interaction.reply({ content: `Valeur de logChannel: \`${guildSettings.logChannel}\``});
        } else if (key == 'testChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { testChannel: value });
                return interaction.reply({ content: `Nouvelle valeur de testChannel: \`${value}\``});
            }
            interaction.reply({ content: `Valeur de testChannel: \`${guildSettings.testChannel}\``});
        }
    }
};