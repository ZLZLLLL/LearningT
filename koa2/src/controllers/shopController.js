const shopService = require('../services/shopService');
const Response = require('../utils/response');

class ShopController {
  async getAllCourses(ctx) {
    try {
      const { userId, page = 1, limit = 10, title = '', teacherName = '' } = ctx.query;
      if (!userId) {
        ctx.body = Response.fail('用户ID不能为空');
        return;
      }

      const result = await shopService.getAllCourses(
        parseInt(userId),
        parseInt(page),
        parseInt(limit),
        title,
        teacherName
      );

      if (result.success) {
        ctx.body = Response.success(result.data);
      } else {
        ctx.body = Response.fail(result.message);
      }
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }
}

module.exports = new ShopController(); 