const {DataTypes, Sequelize} = require("sequelize");

module.exports = (client) => {
    const Type_News = client.define(
        'type_news', {
            type_news_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            type: {type: DataTypes.STRING},
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE,
            },
        },
        {
            timestamps: true
        }
    )
    return Type_News;
}