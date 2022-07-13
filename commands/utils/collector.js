module.exports = {
    name: 'collector',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'collector',
    examples: ['collector'],
    description: "Permet de tester le fonctionnement des collectors",
    async runInteraction (client, interaction) {
        interaction.reply("Taper le message `discord` !");
        const filter = msg => msg.content.includes("discord");
        const collector = interaction.channel.createMessageCollector({ filter, time: 5000 });

        collector.on('end', collected => {
            interaction.followUp(`${collected.size - 1} messages collectés !`);
        })
    }
};