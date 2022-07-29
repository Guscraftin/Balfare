module.exports = {
    name: 'threadUpdate',
    once: false,
    async execute(client, oldThread, newThread){
        if (oldThread.archived && !newThread.archived) newThread.join();
        // Si change nom

        // Si verrouiller par modo

        // Si change Durée archivage auto

        // Si change le slowmode

        // Si change que tous le monde peut désarchiver thread
        
    }
};