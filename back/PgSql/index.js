const {Sequelize} = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('PiyachokWeb', 'postgres', '1111', {dialect: 'postgres', underscored: true});

        const models = {};
        const modelsDir = path.join(process.cwd(), 'PgSql', 'models')

        const readAndSetModels = () => {
            fs.readdir(modelsDir, ((err, files) => {
                files.forEach(file => {

                    const [modelName] = file.split('.');
                    const modelFile = require(path.join(modelsDir, file));

                    models[modelName] = modelFile(client);
                });
            }));

        };

        return {
            getModel: (modelName) => models[modelName],
            setModels: () => readAndSetModels()
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();