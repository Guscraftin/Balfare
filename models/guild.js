const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    logChannel: { 'type': String, 'default': '989109926200762409' },
    testChannel: { 'type': String, 'default': '749268027857567874' }
});

module.exports = mongoose.model('Guild', guildSchema);