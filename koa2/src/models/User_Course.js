const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserCourse = sequelize.define('UserCourse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  purchase_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_course',
  timestamps: false,
  hooks: {}
});

module.exports = UserCourse;
