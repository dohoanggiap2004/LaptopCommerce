const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const User_Address = sequelize.define(
    "User_Address",
    {
        addressId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        addressDetail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ward: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        userId: {
            type: DataTypes.CHAR(36),
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
        tableName: "User_Address",
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
);

module.exports = User_Address;

