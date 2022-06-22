module.exports = {
    name: 'ping',
    description: 'Répond Pong!',
    run: (client, message, args) => {
        message.channel.send('Pong!');
    },
    runSlash: (client, interaction) => {
        interaction.reply('Pong!');
    }
};