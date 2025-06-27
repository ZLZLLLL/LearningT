const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    dialectOptions: {
      // 明确连接使用utf8mb4字符集
      charset: 'utf8mb4'
    },
    pool: config.database.pool,
    logging: config.database.logging,
    timezone: '+08:00', // 设置时区为北京时间
    define: {
      timestamps: true, // 自动添加 createdAt 和 updatedAt
      underscored: true, // 使用下划线命名
      freezeTableName: true // 冻结表名
    }
  }
);

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功！');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
};

module.exports = {
  sequelize,
  testConnection
}; 