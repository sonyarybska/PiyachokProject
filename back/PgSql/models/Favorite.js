const {DataTypes, Sequelize} = require('sequelize');
const db = require('../../PgSql').getInstance();

module.exports = (client) => {
    const Favorite = client.define(
        'favorite', {
            favorite_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            user_id: {type: DataTypes.INTEGER},
            establishment_id: {
                type: DataTypes.INTEGER
            },
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
    );

    return Favorite;
}




