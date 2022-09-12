const { Client, Collection, Partials } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const client = new Client({ intents: 100351, partials: [Partials.User, Partials.Channel, Partials.Message, Partials.Reaction, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.ThreadMember] });
const Logger = require('./utils/Logger');


['commands', 'buttons', 'selects'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
require('./utils/Functions')(client);


process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code : ${code}`) });

process.on('uncaughtException', (err, origin) => { 
    Logger.error(`UNCAUGHT_EXCEPTION : ${err}`)
    console.error(`Origine : ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => { 
    Logger.warn(`UNHANDLE_REJECTION : ${{reason}}`)
    console.log(promise);
});

process.on('warning', (...args) => { Logger.warn(...args) });


mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.client('- connecté à la base de donnée !'); })
.catch(err => { Logger.error(err); });


client.login(process.env.DISCORD_TOKEN);