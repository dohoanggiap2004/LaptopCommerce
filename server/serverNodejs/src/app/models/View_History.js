const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/sequelizeConnect');

const View_History = sequelize.define('View_History', {
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        laptopId: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            primaryKey: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        timestamps: true,
        tableName: 'view_history',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

module.exports = View_History;
