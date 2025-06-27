const adminService = require('../services/adminService');
const courseService = require('../services/courseService');
const Response = require('../utils/response');

class AdminController {
  async login(ctx) {
    try {
      const { adminId, password } = ctx.request.body;
      if (!adminId || !password) {
        return (ctx.body = Response.fail('管理员ID和密码不能为空'));
      }
      const result = await adminService.login(adminId, password);
      ctx.body = result.success
        ? Response.success(result.data, result.message)
        : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async getCourses(ctx) {
    try {
      const { page = 1, limit = 10, title = '', teacherName = '' } = ctx.query;
      const result = await adminService.getCourses(
        parseInt(page),
        parseInt(limit),
        title,
        teacherName
      );
      ctx.body = Response.success(result.data);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async addCourse(ctx) {
    try {
      const courseData = ctx.request.body;
      const result = await adminService.addCourse(courseData);
      ctx.body = Response.success(result.data, result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async updateCourse(ctx) {
    try {
      const { courseId, ...courseData } = ctx.request.body;
      if (!courseId) return (ctx.body = Response.fail('课程ID不能为空'));
      const result = await adminService.updateCourse(courseId, courseData);
      ctx.body = result.success
        ? Response.success(result.data, result.message)
        : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async deleteCourse(ctx) {
    try {
      const { courseId } = ctx.request.body;
      if (!courseId) return (ctx.body = Response.fail('课程ID不能为空'));
      const result = await adminService.deleteCourse(courseId);
      ctx.body = result.success
        ? Response.success({}, result.message)
        : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async getCourseForEdit(ctx) {
    try {
      const { id } = ctx.params;
      if (!id) {
        return (ctx.body = Response.fail('课程ID不能为空'));
      }
      const result = await courseService.getCourseById(id);
      ctx.body = result.success
        ? Response.success(result.data)
        : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  // 获取教师列表
  async getTeachers(ctx) {
    try {
      const teachers = await require('../models/Teacher').findAll({ attributes: ['id', 'name'] });
      ctx.body = Response.success(teachers);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }
}

module.exports = new AdminController(); 