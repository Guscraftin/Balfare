## Quand transfert sur le vrai bot :

-> index.js : Vérifier le token  
-> ready.js : Vérifier le status + le déploiement des commandes en global

# Choses à faire :

- Revoir tous les logs en les finalisant
- Ajouter des try catch si manque des perms (pour éviter erreur et prévenir des perms à ajouter comme dans debug) ou si un jour à cause MAJ devient à null ou innacessible
- Ajouter un thème au bot pour que ce soit plus agréable à lire et qu'il y ai une personnalité
- Corriger les warnings du bot (regarder via le serv)

### Logs

- userUpdate.js                 => Tout faire car pas test
- guildMemberAdd.js             => Diff bot / membre
- guildMemberRemove.js          => Revoir l'affichage si ban ou kick + Diff bot / membre
- guildMemberUpdate.js          => Ajouter les trucs nitro
- threadMembersUpdate           => Quand mentionne plusieurs pers dans un message pour rejoindre le fil, seul le premier est dans les logs
- messageReactionAdd.js         -> Fix si utile de faire des actions quand on réagit à des messages
- messageReactionRemoveAll.js   -> Ajouter les membres qui avaient réagit
- messageReactionRemoveEmoji.js -> Ajouter les membres qui avaient réagit
- messageDelete.js              ==> Plus de détails (notamment embed)
- messageDeleteBulk.js          ==> Plus de détails (notamment embed)
- messageUpdate.js              ==> Plus de détails (notamment embed)
- presenceUpdate.js             -> Inutile ? Suppr le fichier ? (vérif si contenue inaproprié ?)

- Faire la catégorie des guild_scheduled_events

- channelCreate.js              ==> Plus de détails (tout faire)
- channelDelete.js              ==> Plus de détails (pour tout salon)
- channelUpdate.js              ==> Plus de détails (tout faire)
- guildUpdate.js                => Plus de détails (notamment fonctionnalitée nitro)
- stageInstanceDelete.js        -> Envoie le message 2 fois

+ Ajouter les id partout pour avec les commande info, récupérer facilement des informations
+ Gérer les salons spéciaux communauté (stage, forum, annonce, événements)
+ Gérer les fonctionnalités nitro


### Commande

- Ajouter que seul les gens avec les bonnes perms peuvent voir les commandes qu'ils peuvent excécuter
- Revoir toutes les commandes pour les personnalisées, voir si on les garde, mettre les bonnes perms...

- kick-all-with-role            -> Avec une option qui def quels gens avec ce rôle ou non kick et si c'est les gens que avec ces rôles ou si c'est au moins ces rôles

### Bugs

- Quand quitte un serv et qu'on est dans un thread

### Autre

- Base de donnée : Passer à MariaDB (SQL) en local