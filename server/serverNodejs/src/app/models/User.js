// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING(255),
  },
  phone: {
    type: DataTypes.STRING(255), // Khớp với kiểu dữ liệu trong bảng
  },
  dateOfBirth: {
    type: DataTypes.STRING(255), // Chỉnh lại kiểu dữ liệu theo bảng (varchar)
  },
  addressDetail: {
    type: DataTypes.STRING(255), // Thêm trường addressDetail
  },
  district: {
    type: DataTypes.STRING(255), // Thêm trường district
  },
  province: {
    type: DataTypes.STRING(255), // Thêm trường province
  },
  ward: {
    type: DataTypes.STRING(255), // Thêm trường ward
  },
  role: {
    type: DataTypes.STRING(255), // Chỉnh độ dài theo bảng
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
  tableName: 'users',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci'
});

module.exports = User;

