const {DataTypes, Sequelize} = require('sequelize');
const db = require('../../PgSql').getInstance();


module.exports = (client) => {
    const Token = db.getModel('Token');
    const Establishment = db.getModel('Establishment');
    const Review = db.getModel('Review');

    const User = client.define(
        'user', {
            user_id: {
                type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                required: true
            },

            email: {
                type: DataTypes.STRING, unique: true, required: true
            },

            picture: {
                type: DataTypes.STRING
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            phone_number: {
                type: DataTypes.STRING,
            },
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE,
            }

        },
        {
            timestamps: true
        }
    );

    Token.hasOne(User, {foreignKey: 'user_id'});
    User.belongsTo(Token, {foreignKey: 'user_id'});

    Establishment.hasOne(User, {foreignKey: 'user_id'});
    User.belongsTo(Establishment, {foreignKey: 'user_id'});

    Review.hasOne(User, {foreignKey: 'user_id'});
    User.belongsTo(Review, {foreignKey: 'user_id'});

    return User;
}