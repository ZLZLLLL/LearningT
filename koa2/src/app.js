const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');
const errorHandler = require('./middleware/errorHandler');

// 导入新路由
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const courseRoutes = require('./routes/courseRoute');


const app = new Koa();

// Session 配置
app.keys = ['your-secret-key-here']; // 用于签名 cookie 的密钥
const CONFIG = {
  key: 'koa.sess', // cookie 的 key
  maxAge: 86400000, // cookie 的过期时间，24小时
  autoCommit: true, // 自动提交头部
  overwrite: true, // 是否允许重写
  httpOnly: true, // 是否禁止客户端访问
  signed: true, // 签名 cookie
  rolling: false, // 每次请求强制设置 cookie
  renew: false, // 当 session 快过期时更新 session
  secure: false, // 只在 https 下发送
  sameSite: null, // cookie 的 sameSite 属性
};

// 中间件
app.use(session(CONFIG, app));
app.use(cors({
  origin: (ctx) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
    const origin = ctx.request.header.origin;
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    return false;
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
}));
app.use(bodyParser());

// 注册新路由
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(shopRoutes.routes()).use(shopRoutes.allowedMethods());
app.use(cartRoutes.routes()).use(cartRoutes.allowedMethods());
app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());
app.use(courseRoutes.routes()).use(courseRoutes.allowedMethods());


// 错误处理中间件
app.on('error', errorHandler);

module.exports = app;