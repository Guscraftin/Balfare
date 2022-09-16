# Choses à faire :

-> Revoir tous les logs en les finalisant + ajouter des try catch si manque des perms (pour éviter erreur et prévenir des perms à ajouter comme dans debug) ou si un jour à cause MAJ devient à null ou innacessible + Plus agréable à lire et un thème et une méthode commune [Comme les titres]

- userUpdate.js                 => Tout faire car pas test
- guildMemberAdd.js             => Diff bot / membre
- guildMemberRemove.js          => Revoir l'affichage si ban ou kick + Diff bot / membre
- guildMemberUpdate.js          => Ajouter les trucs nitro
- messageReactionAdd.js         -> Fix si utile de faire des actions quand on réagit à des messages
- messageReactionRemoveAll.js   -> Ajouter les membres qui avaient réagit
- messageReactionRemoveEmoji.js -> Ajouter les membres qui avaient réagit
- messageDelete.js              ==> Plus de détails (notamment embed)
- messageDeleteBulk.js          ==> Plus de détails (notamment embed)
- messageUpdate.js              ==> Plus de détails (notamment embed)
- voiceStateUpdate.js           -> Fix demande de parole dans stage : quand quitte la scène main se lève et se baisse
- presenceUpdate.js             -> Fix le status qui se met toujours à jour (vraiment utile en log ? juste stats ?)

- Faire la catégorie des guild_scheduled_events

- channelCreate.js              ==> Plus de détails (tout faire)
- channelDelete.js              ==> Plus de détails (pour tout salon)
- channelUpdate.js              ==> Plus de détails (tout faire)
- guildUpdate.js                => Plus de détails (notamment fonctionnalitée nitro)
- stageInstanceDelete.js        -> Envoie le message 2 fois


## Quand transfert sur le vrai bot :

-> index.js : Vérifier le token  
-> ready.js : Vérifier le status + le déploiement des commandes en global