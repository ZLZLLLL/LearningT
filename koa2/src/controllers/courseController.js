const courseService = require('../services/courseService');
const Response = require('../utils/response');

class CourseController {
  async getCourseDetail(ctx) {
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
}

module.exports = new CourseController();