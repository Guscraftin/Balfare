const { Guild } = require('../../models/index');

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    examples: ['update'],
    description: 'Mettre à jour les nouvelles données !',
    async runInteraction (client, interaction) {
        // Add a new field
        // await Guild.updateMany({}, { "$set": { "testChannel" : "749268027857567874" }, upsert: true });

        // Remove a field
        // await Guild.updateMany({}, { $unset: { testChannel: "" } });
        interaction.reply("Nouvelles données ajoutées !");
    }
};