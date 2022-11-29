
// Demande payé de Gino jusqu'au 4 décembre 2022 à 23h59

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message){
        if (message.author.id === "687923246007451648") {
            message.react('👻');
        }
    }
};