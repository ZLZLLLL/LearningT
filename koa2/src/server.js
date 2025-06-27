const app = require('./app');
const { PORT } = require('./config/config');
const { testConnection } = require('./config/database');
const { syncModels } = require('./models');

// 启动服务器
const startServer = async () => {
  try {
    // 测试数据库连接
    await testConnection();
    
    // 同步数据库模型（不强制删除现有表）
    await syncModels(false);
    
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`服务器运行在端口 ${PORT}`);
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();