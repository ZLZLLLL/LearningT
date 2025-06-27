const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    unique: true,
    field: 'studentId'
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'user',
  timestamps: false
});

// 类方法：通过userid查找用户
User.findByUserid = function(userid) {
  return this.findByPk(userid);
};

module.exports = User;
