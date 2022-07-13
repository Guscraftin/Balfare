const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'dbconfig [key] <value>',
    examples: ['dbconfig', 'dbconfig prefix ?', 'dbconfig prefix'],
    description: 'Configurer les données de la base de donnée !',
    async run (client, message, args, guildSettings) {
        if (!args[0] || !args[0].match(/^(prefix|logChannel)$/)) return message.reply("Merci d'entrer une clé valide (`prefix`/`logChannel`)");
        const value = args[1];

        if (args[0] == 'prefix') {
            if (value) {
                await client.updateGuild(message.guild, { prefix: value });
                return message.reply({ content: `Nouvelle valeur de prefix: \`${value}\``});
            }
            message.reply({ content: `Valeur de prefix: \`${guildSettings.prefix}\``});
        } else if (args[0] == 'logChannel') {
            if (value) {
                await client.updateGuild(message.guild, { logChannel: value });
                return message.reply({ content: `Nouvelle valeur de logChannel: \`${value}\``});
            }
            message.reply({ content: `Valeur de prefix: \`${guildSettings.logChannel}\``});
        }
    },
    options: [
        {
            name: 'key',
            description: 'Choisir une clé à modifier ou afficher',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'prefix',
                    value: 'prefix'
                },
                {
                    name: 'logChannel',
                    value: 'logChannel'
                }
            ]
        },
        {
            name: 'value',
            description: 'Choisir la nouvelle valeur pour votre clé',
            type: 'STRING'
        }
    ],
    async runInteraction (client, interaction, guildSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');

        if (key == 'prefix') {
            if (value) {
                await client.updateGuild(interaction.guild, { prefix: value });
                return interaction.reply({ content: `Nouvelle valeur de prefix: \`${value}\``});
            }
            interaction.reply({ content: `Valeur de prefix: \`${guildSettings.prefix}\``});
        } else if (key == 'logChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { logChannel: value });
                return interaction.reply({ content: `Nouvelle valeur de logChannel: \`${value}\``});
            }
            interaction.reply({ content: `Valeur de prefix: \`${guildSettings.logChannel}\``});
        }
    }
};