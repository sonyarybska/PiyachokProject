const {DataTypes, Sequelize} = require('sequelize');

module.exports = (client) => {
    const Establishment = client.define(
        'establishment', {
            establishment_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            title: {type: DataTypes.STRING},
            type: {
                type: DataTypes.STRING
            },
            avatar: {type: DataTypes.STRING(100)},
            location: {type: DataTypes.STRING(200)},
            start_work: {type: DataTypes.TIME},
            end_work: {type: DataTypes.TIME},
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING)
            },
            average_check: {type: DataTypes.INTEGER},
            approved: {type: DataTypes.BOOLEAN, defaultValue: false},
            pending: {type: DataTypes.BOOLEAN, defaultValue: true},
            rejected: {type: DataTypes.BOOLEAN, defaultValue: false},
            user_id: {type: DataTypes.INTEGER},
            photos: {type: DataTypes.ARRAY(DataTypes.STRING(100))},
            phone: {type: DataTypes.STRING, validate: {
                    is: /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm
                }},
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


    return Establishment;
}




