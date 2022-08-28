const ownerId = process.env.OWNER_ID;
const { InteractionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction){
        let guildSettings = await client.getGuild(interaction.guild);
        const logChannel = client.channels.cache.get(guildSettings.logChannel);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**La commande \`${interaction.commandName}\` du bot ${client.user} a été utilisé par ${interaction.user} dans ${interaction.channel}.**
            `)
            .setTimestamp()
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })

        logChannel.send({ embeds: [embed] });


        if (!guildSettings) {
            await client.createGuild(interaction.guild);
            guildSettings = await client.getGuild(interaction.guild);
            return interaction.reply('Le bot a mis à jour la base de données pour votre serveur, merci de retaper la commande !');
        }

        if (interaction.type === InteractionType.ApplicationCommand || interaction.isContextMenuCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply("Cette commande n'existe pas !");

            if (cmd.ownerOnly) {
                if (interaction.user.id != ownerId) return interaction.reply("La seule personne pouvant taper cette commande est l'owner du bot !");
            }

            if (interaction.user.id != ownerId || !interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande !`, ephemeral: true });

            cmd.runInteraction(client, interaction, guildSettings);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply("Ce boutton n'existe pas !");
            btn.runInteraction(client, interaction, guildSettings);
        } else if (interaction.isSelectMenu()) {
            const selectMenu = client.selects.get(interaction.customId);
            if (!selectMenu) return interaction.reply("Ce menu n'existe pas !");
            selectMenu.runInteraction(client, interaction, guildSettings);
        }
    }
};