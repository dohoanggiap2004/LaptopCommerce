const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Laptop = sequelize.define(
    "Laptop",
    {
        laptopId: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false,
        },
        battery: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        cpu: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        frameRate: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        manufacturer: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        os: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ram: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        resolution: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        screenSize: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        stockAvailable: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        storage: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        vga: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        webcam: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        weight: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        specialPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        tableName: "laptops",
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
);

module.exports = Laptop;
