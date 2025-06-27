const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('Course', {
  courseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'courseId'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'teacherId'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'course',
  timestamps: false,
  hooks: {}
});

module.exports = Course;
