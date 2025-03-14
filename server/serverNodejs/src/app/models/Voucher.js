const {sequelize} = require('../../config/sequelizeConnect')
const {DataTypes} = require("sequelize");

const Voucher = sequelize.define('Vouchers', {
        voucherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        voucherCode: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        voucherDiscount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
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
    }, {
        tableName: 'Vouchers',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
)

module.exports = Voucher;
