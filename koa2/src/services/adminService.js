const { Admin, Course, Teacher, sequelize } = require('../models');
const { QueryTypes, Op } = require('sequelize');

// 管理员登录
const login = async (adminId, password) => {
  const admin = await Admin.findOne({ where: { adminId } });
  if (!admin) {
    return { success: false, message: '管理员不存在' };
  }
  if (admin.password !== password) {
    return { success: false, message: '密码错误' };
  }
  return { success: true, data: { adminId: admin.adminId }, message: '登录成功' };
};

// 查询课程列表
const getCourses = async (page, limit, title, teacherName) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }
  // 需要通过include的where实现teacherName模糊
  const include = [{ model: Teacher, attributes: ['name'] }];
  if (teacherName) {
    include[0].where = { name: { [Op.like]: `%${teacherName}%` } };
    // 需要设置required为true，否则会查出所有课程
    include[0].required = true;
  }
  const list = await Course.findAll({
    where,
    include,
    limit,
    offset
  });
  // 统计总数也要加过滤条件
  const total = await Course.count({ where, include });
  return { success: true, data: { total, list } };
};

// 新增课程
const addCourse = async (courseData) => {
  const newCourse = await Course.create(courseData);
  return { success: true, data: newCourse, message: '新增成功' };
};

// 修改课程
const updateCourse = async (courseId, courseData) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    return { success: false, message: '课程不存在' };
  }
  await course.update(courseData);
  return { success: true, data: course, message: '修改成功' };
};

// 删除课程
const deleteCourse = async (courseId) => {
  const result = await Course.destroy({ where: { courseId } });
  if (result > 0) {
    return { success: true, message: '删除成功' };
  }
  return { success: false, message: '课程不存在' };
};

module.exports = {
  login,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
}; 