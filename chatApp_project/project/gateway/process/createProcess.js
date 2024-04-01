const {spawn} = require('child_process');

module.exports = function createProcess(path, args, onOut = () => {}, onErr = () => {}, onClose = () => {}) {
    const process = spawn(path, args);
    process.stdout.on('data', onOut);
    process.stderr.on('data', onErr);
    process.on('close', onClose);
};

