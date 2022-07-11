const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '°' },
    logChannel: { 'type': String, 'default': '989109926200762409' },
});

module.exports = mongoose.model('Guild', guildSchema);