const { sequelize } = require('../../config/sequelizeConnect');

const User = require('./User');
const Order = require('./Order');
const Laptop = require('./Laptop');
const Comment = require('./Comment');
const View_History = require('./View_History');
const User_Address = require('./User_Address');
const Voucher = require('./Voucher');
const Brand = require('./Brand');
const Installment = require('./Installment');
const Order_Laptop = require('./Order_Laptop');
const Booking = require('./Booking');

// Thiết lập các mối quan hệ
Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'userId' });

Order.belongsTo(Voucher, { foreignKey: 'voucherId', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
Voucher.hasMany(Order, { foreignKey: 'voucherId' });

Order.belongsToMany(Laptop, { through: Order_Laptop, foreignKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Laptop.belongsToMany(Order, { through: Order_Laptop, foreignKey: 'laptopId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.belongsToMany(Laptop, { through: Comment, foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Laptop.belongsToMany(User, { through: Comment, foreignKey: 'laptopId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

View_History.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(View_History, { foreignKey: 'userId' });

View_History.belongsTo(Laptop, { foreignKey: 'laptopId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Laptop.hasMany(View_History, { foreignKey: 'laptopId' });

User_Address.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(User_Address, { foreignKey: 'userId' });

User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// Xuất tất cả các mô hình
module.exports = {
    sequelize,
    User,
    Brand,
    Order,
    Laptop,
    Comment,
    View_History,
    User_Address,
    Voucher,
    Installment,
    Order_Laptop,
    Booking,
};
