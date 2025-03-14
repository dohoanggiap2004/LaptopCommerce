const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Comment = sequelize.define('Comment', {
    laptopId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    userId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    comment_text: {
        type: DataTypes.TEXT,
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
}, {
    tableName: "comments",
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
});

module.exports = Comment;
