const cartService = require('../services/cartService');
const Response = require('../utils/response');

class CartController {
  async add(ctx) {
    try {
      const { courseId } = ctx.request.body;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      
      if (!courseId) {
        ctx.body = Response.fail('课程ID不能为空');
        return;
      }
      const result = await cartService.addToCart(userId, courseId);
      ctx.body = result.success ? Response.success({}, result.message) : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async list(ctx) {
    try {
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      const result = await cartService.getCart(userId);
      ctx.body = Response.success(result.data);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async remove(ctx) {
    try {
      const { courseId } = ctx.request.body;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      
      if (!courseId) {
        ctx.body = Response.fail('课程ID不能为空');
        return;
      }
      const result = await cartService.removeFromCart(userId, courseId);
      ctx.body = result.success ? Response.success({}, result.message) : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }
}

module.exports = new CartController(); 