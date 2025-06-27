const { Cart, Course, Teacher, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// 添加到购物车
const addToCart = async (userId, courseId) => {
  // 检查是否已在购物车中
  const existingItem = await Cart.findOne({ where: { userId, courseId } });
  if (existingItem) {
    return { success: false, message: '该课程已在您的购物车中' };
  }
  await Cart.create({ userId, courseId });
  return { success: true, message: '成功添加到购物车' };
};

// 获取购物车列表
const getCart = async (userId) => {
  const query = `
    SELECT
      c.courseId,
      c.title,
      c.image,
      t.name as teacher,
      c.price
    FROM cart ca
    JOIN course c ON ca.course_id = c.courseId
    LEFT JOIN teacher t ON c.teacherId = t.id
    WHERE ca.user_id = ?
  `;
  const list = await sequelize.query(query, {
    replacements: [userId],
    type: QueryTypes.SELECT,
  });
  return { success: true, data: { list } };
};

// 从购物车删除
const removeFromCart = async (userId, courseId) => {
  const result = await Cart.destroy({ where: { userId, courseId } });
  if (result > 0) {
    return { success: true, message: '删除成功' };
  }
  return { success: false, message: '购物车中未找到该课程' };
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
}; 