const { Guild } = require('../models');

module.exports = client => {
    client.getGuild = async guild => {
        const guildData = await Guild.findOne({ id: guild.id });
        return guildData;
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({ id: guild.id });
        createGuild.save()
    };

    client.updateGuild = async (guild, settings) => {
        let guildData = await client.getGuild(guild);
        if (typeof guildData != 'object') guildData = {};
        for (const key in settings){
            if (guildData[key] != settings[key]) guildData[key] = settings[key];
        }
        return guildData.updateOne(settings);
    }

    client.deleteGuild = async guild => {
        let deletedGuild = await client.getGuild(guild);
        return deletedGuild.remove({id: guild.id});
    }
}