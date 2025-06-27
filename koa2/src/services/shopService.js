const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// 获取所有在售课程
const getAllCourses = async (userId, page, limit, title, teacherName) => {
  const offset = (page - 1) * limit;
  let whereClauses = [];
  const replacements = [];
  
  if (title) {
    whereClauses.push('c.title LIKE ?');
    replacements.push(`%${title}%`);
  }
  if (teacherName) {
    whereClauses.push('t.name LIKE ?');
    replacements.push(`%${teacherName}%`);
  }

  const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // 查询课程列表
  const coursesQuery = `
    SELECT
      c.courseId,
      c.title,
      c.image,
      t.name AS teacher,
      c.price,
      (CASE WHEN uc.userId IS NOT NULL THEN true ELSE false END) AS purchased
    FROM course c
    LEFT JOIN teacher t ON c.teacherId = t.id
    LEFT JOIN user_course uc ON c.courseId = uc.courseId AND uc.userId = ?
    ${whereString}
    LIMIT ? OFFSET ?
  `;
  const list = await sequelize.query(coursesQuery, {
    replacements: [userId, ...replacements, limit, offset],
    type: QueryTypes.SELECT,
  });

  // 查询总数
  const countQuery = `
    SELECT COUNT(*) as total
    FROM course c
    LEFT JOIN teacher t ON c.teacherId = t.id
    ${whereString}
  `;
  const countResult = await sequelize.query(countQuery, {
    replacements,
    type: QueryTypes.SELECT,
  });

  const total = countResult[0].total;

  return { success: true, data: { total, list } };
};

module.exports = {
  getAllCourses,
}; 