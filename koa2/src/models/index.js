const { sequelize } = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Teacher = require('./Teacher');
const Admin = require('./Admin');
const Cart = require('./Cart');
const UserCourse = require('./User_Course');
const PurchaseOrder = require('./PurchaseOrder');

// 定义模型之间的关联关系
Course.belongsTo(Teacher, { foreignKey: 'teacherId' });
Teacher.hasMany(Course, { foreignKey: 'teacherId' });

PurchaseOrder.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(PurchaseOrder, { foreignKey: 'courseId' });

// 同步所有模型到数据库
const syncModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('数据库模型同步完成！');
  } catch (error) {
    console.error('数据库模型同步失败:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Course,
  Teacher,
  Admin,
  Cart,
  UserCourse,
  PurchaseOrder,
  syncModels
}; 