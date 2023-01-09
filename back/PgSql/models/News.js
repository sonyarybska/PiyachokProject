const {DataTypes, Sequelize} = require('sequelize');
const db = require('../../PgSql').getInstance();

module.exports = (client) => {
    const News = client.define('new', {
        news_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        text: {type: DataTypes.STRING},
        photo: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        createdAt: {
            field: 'created_at', type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at', type: Sequelize.DATE,
        },
        establishment_id:{
            type:DataTypes.INTEGER
        }

    }, {
        timestamps: true
    });

    return News;
}
