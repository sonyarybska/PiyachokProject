const {DataTypes, Sequelize} = require('sequelize');
const db = require('../../PgSql').getInstance();

module.exports = (client) => {
    const Establishment = db.getModel('Establishment');

    const Review = client.define(
        'review', {
            review_id: {
                type: DataTypes.INTEGER
            },
            text: {
                type: DataTypes.STRING
            },
            check: {
                type: DataTypes.FLOAT
            },
            rating: {
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
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            establishment_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            }
        },
        {
            timestamps: true
        }
    );


    Establishment.hasMany(Review, {as: 'review', foreignKey:'establishment_id' });
    Review.belongsTo(Establishment, { as: 'establishment', foreignKey:'establishment_id'});

    return Review;
}