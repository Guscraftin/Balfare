// const { EmbedBuilder } = require('discord.js');

// module.exports = {
//     name: 'presenceUpdate',
//     once: false,
//     async execute(client, oldPresence, newPresence){
//         const fetchGuild = await client.getGuild(newPresence.guild);
//         const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        
//         const embed = new EmbedBuilder()
//             .setAuthor({ name: newPresence.user.tag, iconURL: newPresence.user.displayAvatarURL() })
//             .setColor('#009ECA')
//             .setDescription(`${ oldPresence.status !== newPresence.status ? `**Status :** \`${oldPresence.status}\` => \`${newPresence.status}\`\n` : ``} ${ oldPresence.activities !== newPresence.activities ? `**Activité :** \`${oldPresence.activities}\` => \`${newPresence.activities}\`\n` : ``} ${infoDevices()}
//             `)
//             .setTimestamp()
//             .setFooter({ text: newPresence.guild.name, iconURL: newPresence.guild.iconURL() })
    
//         if (newPresence.user.bot) return;
//         logChannel.send({ embeds: [embed] });


// Ajouter ces paramètres et voir si vraiment utiles en logs
//         console.log(newPresence.activities.length);
//         console.log(newPresence.activities[0].details);
//         console.log(newPresence.activities[0].emoji.name);
//         console.log(newPresence.activities[0].name);
//         console.log(newPresence.activities[0].state);
//         console.log(newPresence.activities[0].type);



//         function infoDevices () {
//             const oldDevice = whatOldDevice();
//             const newDevice = whatNewDevice();

//             if (oldDevice !== newDevice) {
//                 return `**Appareil utilisé :** \`${oldDevice}\` => \`${newDevice}\``;
//             } else { return `` }
//         }

//         function whatOldDevice () {
//             if (oldPresence.clientStatus.web !== undefined) {
//                 return 'web';
//             } else if (oldPresence.clientStatus.mobile !== undefined) {
//                 return 'mobile';
//             } else if (oldPresence.clientStatus.desktop !== undefined) {
//                 return 'desktop';
//             } else {
//                 return `Aucun`;
//             }
//         }

//         function whatNewDevice () {
//             if (newPresence.clientStatus.web !== undefined) {
//                 return 'web';
//             } else if (newPresence.clientStatus.mobile !== undefined) {
//                 return 'mobile';
//             } else if (newPresence.clientStatus.desktop !== undefined) {
//                 return 'desktop';
//             } else {
//                 return `Aucun`;
//             }
//         }
//     }
// };