module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message){
        
        // Add reaction in #saviez-vous in LSDC server
        if (message.channel.id === '820761893652135936') {
            message.react('<:Pouce_bleu:784544070957268992>');
            message.react('<:Pouce_rouge:784544048814751744>');
        }
    }
};