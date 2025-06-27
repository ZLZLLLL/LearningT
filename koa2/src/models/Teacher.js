const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'teacher',
  timestamps: false,
  hooks: {}
});

module.exports = Teacher;
