const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');

const contextDescription = {
    userinfo : "Renvoie des informations sur l'utilisateur"
}

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping <command>',
    examples: ['help', 'help ping', 'help emit'],
    description: 'Renvoie une liste de commande filtrée par catégorie',
    options: [
        {
            name: 'command',
            description: 'Taper le nom de votre commande',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    async runInteraction (client, interaction, guildSettings) {
        const prefix = '/';
        const cmdName = interaction.options.getString('command');

        if (!cmdName){
            const noArgsEmbed = new EmbedBuilder()
                .setColor('#6e4aff')
                .addFields([{ name: 'Liste des commandes', value: `Liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <commande>\`` }])

            for (const category of commandFolder){
                noArgsEmbed.addFields([{
                    name: `• ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    value: `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join('\`, \`')}\``
                }]);
            }

            return interaction.reply({ embeds : [noArgsEmbed], ephemeral: true });
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({ content: "Cette commande n'existe pas !", ephemeral: true });

        return interaction.reply({ content:
`\`\`\`makefile
[Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les admins du bot uniquement /!\\' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(', ')}
Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}

---

${prefix} = prefix utilisé pour le bot (c'est à dire qu'il faut utiliser les slash commandes)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)
Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes.
        \`\`\``, ephemeral: true});
    }
};