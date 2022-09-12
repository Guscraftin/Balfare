const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    logChannel: { 'type': String, 'default': '1013027048207425628' },
    testChannel: { 'type': String, 'default': '1013027048207425628' }
});

module.exports = mongoose.model('Guild', guildSchema);