const Sequalize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');
const {DB_NAME, DB_PASSWORD, DB_USER} = require('../config/dataBase');

module.exports = (() => {
    let instance;

    function initConnection() {
        let client = new Sequalize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false,
        });
        let models = {};

       function getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(resolve(`./dataBase/models/${modelName}`))
                    console.log(models);
                });
            });
        }

        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels()
        };
    }

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            instance.setModels();
            return instance;
        }
    }
})();
