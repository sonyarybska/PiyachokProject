const {DataTypes, Sequelize} = require('sequelize');

module.exports = (client) => {
    const Token = client.define(
        'token', {
            token_id: {
                type: DataTypes.INTEGER
            },
            refresh_token: {
                type: DataTypes.STRING
            },
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE,
            },
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            }
        },
        {
            timestamps: true
        }
    );
     return Token;
}
