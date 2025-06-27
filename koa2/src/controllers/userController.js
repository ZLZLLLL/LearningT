const userService = require('../services/userService');
const Response = require('../utils/response');

class UserController {
  async login(ctx) {
    try {
      const { studentId, password } = ctx.request.body;
      if (!studentId || !password) {
        ctx.body = Response.fail('学号和密码不能为空');
        return;
      }

      const result = await userService.login(studentId, password);
      
      if (result.success) {
        // 将用户信息存储到 session 中
        ctx.session.user = {
          id: result.data.id,
          studentId: studentId,
          name: result.data.name,
          balance: result.data.balance
        };
        
        ctx.body = Response.success(result.data, '登录成功');
      } else {
        ctx.body = Response.fail(result.message);
      }
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async logout(ctx) {
    try {
      // 清除 session 中的用户信息
      ctx.session.user = null;
      ctx.body = Response.success(null, '登出成功');
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async getCurrentUser(ctx) {
    try {
      // 从 session 中获取当前用户信息
      if (!ctx.session.user) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          data: null,
          message: '未登录或登录已过期'
        };
        return;
      }
      ctx.body = {
        success: true,
        data: ctx.session.user,
        message: '获取成功'
      };
    } catch (error) {
      ctx.body = {
        success: false,
        data: null,
        message: error.message
      };
    }
  }

  async register(ctx) {
    try {
      const { studentId, password, name } = ctx.request.body;
      if (!studentId || !password || !name) {
        ctx.body = Response.fail('学号、密码和姓名不能为空');
        return;
      }

      const result = await userService.register(studentId, password, name);
      
      if (result.success) {
        ctx.body = Response.success(result.data, '注册成功');
      } else {
        ctx.body = Response.fail(result.message);
      }
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async getPurchasedCourses(ctx) {
    try {
      const { page = 1, limit = 10, title = '', teacherName = '' } = ctx.query;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID

      const result = await userService.getPurchasedCourses(
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

  async recharge(ctx) {
    try {
      const { amount } = ctx.request.body;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      
      if (amount === undefined) {
        ctx.body = Response.fail('充值金额不能为空');
        return;
      }
      if (parseFloat(amount) <= 0) {
        ctx.body = Response.fail('充值金额必须为正数');
        return;
      }
      const result = await userService.recharge(userId, amount);
      if (result.success) {
        // 更新 session 中的余额
        ctx.session.user.balance = result.data.balance;
        ctx.body = Response.success(result.data, '充值成功');
      } else {
        ctx.body = Response.fail(result.message);
      }
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async getBalance(ctx) {
    try {
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      const result = await userService.getBalance(userId);
      ctx.body = result.success
        ? Response.success(result.data)
        : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async purchaseCourses(ctx) {
    try {
      const { courseIds, clearCart = false } = ctx.request.body;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      
      if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
        return (ctx.body = Response.fail('请选择要购买的课程'));
      }

      const result = await userService.purchaseCourses(userId, courseIds, clearCart);
      if (result.success) {
        // 更新 session 中的余额
        ctx.session.user.balance = result.data.balance;
      }
      ctx.body = result.success
        ? Response.success(result.data, result.message)
        : Response.fail(result.message);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }

  async getPurchaseRecords(ctx) {
    try {
      const { page = 1, limit = 10 } = ctx.query;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID

      const result = await userService.getPurchaseRecords(
        parseInt(userId),
        parseInt(page),
        parseInt(limit)
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

  async getOrderHistory(ctx) {
    try {
      const { page = 1, limit = 10 } = ctx.query;
      const userId = ctx.state.user.id; // 从 session 中获取用户ID
      const result = await userService.getOrderHistory(
        parseInt(userId),
        parseInt(page),
        parseInt(limit)
      );
      ctx.body = Response.success(result.data);
    } catch (error) {
      ctx.body = Response.error(error.message);
    }
  }
}

module.exports = new UserController(); 