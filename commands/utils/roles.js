const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const selectMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roles-menu')
            .setPlaceholder('Choisir un rôle dans la liste')
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions([
                {
                    label: 'Vert',
                    description: 'Choisir la couleur verte',
                    value: '990655269736448032'
                },
                {
                    label: 'Rouge',
                    description: 'Choisir la couleur rouge',
                    value: '990655290603106374'
                },
                {
                    label: 'Orange',
                    description: 'Choisir la couleur orange',
                    value: '990655307938152530'
                }
            ])
    )

module.exports = {
    name: 'roles',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'roles',
    examples: ['roles'],
    description: "Permet d'afficher le menu pour choisir des rôles",
    async run (client, message, args) {
        await message.channel.send({ content: 'Choisir un rôle', components: [selectMenu] });
    },
    async runInteraction (client, interaction) {
        await interaction.reply({ content: 'Choisir un rôle', components: [selectMenu] });
    }
};