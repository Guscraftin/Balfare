const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async client => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async (btnFile) => {
        const btn = require(btnFile);
        if (!btn.name) return Logger.warn(`Button non fonctionnel : ajouter un nom à votre button ↓\nFichier -> ${btnFile}`);
        client.buttons.set(btn.name, btn);
    });
};