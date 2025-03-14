const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const InstallmentPlan = sequelize.define(
    "InstallmentPlan",
    {
        installmentId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        company: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        downPayment: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        flatInterestRate: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        installmentPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        monthlyInstallment: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        requiredDocuments: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        term: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        totalPayment: {
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
        tableName: "installments",
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
);

module.exports = InstallmentPlan;
