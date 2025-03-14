const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/sequelizeConnect');

const Brand = sequelize.define(
    "Brand",
    {
        brandId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, // Nếu brandId tự tăng
        },
        brandName: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
        tableName: 'brands',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
);

module.exports = Brand;
