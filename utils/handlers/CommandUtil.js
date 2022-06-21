const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);
        client.commands.set(cmd.name, cmd);

        console.log(`Commande chargée : ${cmd.name}`);
    });
};