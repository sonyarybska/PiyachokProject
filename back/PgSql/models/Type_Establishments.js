const {DataTypes, Sequelize} = require("sequelize");

module.exports = (client) => {
const Type_Establishments = client.define(
    'type_establishments', {
        type_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
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
return Type_Establishments;
}