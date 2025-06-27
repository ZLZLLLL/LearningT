const { Course, Teacher } = require('../models');

// 根据ID获取课程详情
const getCourseById = async (courseId) => {
  const course = await Course.findByPk(courseId, {
    include: [{
      model: Teacher,
      attributes: ['name']
    }]
  });

  if (!course) {
    return { success: false, message: '课程不存在' };
  }
  return { success: true, data: course };
};

module.exports = {
  getCourseById,
}; 