const Response = require('../utils/response');

// 用户认证中间件
const authMiddleware = async (ctx, next) => {
  // 检查 session 中是否有用户信息
  if (!ctx.session.user) {
    ctx.status = 401;
    ctx.body = Response.fail('请先登录');
    return;
  }
  
  // 将用户信息添加到 ctx.state 中，供后续中间件和控制器使用
  ctx.state.user = ctx.session.user;
  
  await next();
};

// 可选认证中间件（不强制要求登录）
const optionalAuthMiddleware = async (ctx, next) => {
  if (ctx.session.user) {
    ctx.state.user = ctx.session.user;
  }
  
  await next();
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware
}; 