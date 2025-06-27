const { User, Course, Teacher, PurchaseOrder, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// 注册
const register = async (studentId, password, name) => {
  // 检查 studentId 是否已存在
  const existingUsers = await sequelize.query(
    'SELECT `studentId` FROM `user` WHERE `studentId` = ?',
    {
      replacements: [studentId],
      type: QueryTypes.SELECT,
    }
  );

  if (existingUsers.length > 0) {
    return { success: false, message: '用户学号已存在' };
  }

  // 创建用户
  const newUser = await User.create({ studentId, password, name });

  return { success: true, data: { studentId: newUser.studentId, name: newUser.name } };
};

// 登录
const login = async (studentId, password) => {
  const users = await sequelize.query(
    'SELECT * FROM `user` WHERE `studentId` = ?',
    {
      replacements: [studentId],
      type: QueryTypes.SELECT,
    }
  );

  if (users.length === 0) {
    return { success: false, message: '用户不存在' };
  }

  const user = users[0];

  const isPasswordValid = (password === user.password);
  if (!isPasswordValid) {
    return { success: false, message: '密码错误' };
  }

  // 返回指定格式的数据
  const userData = {
    id: user.id,
    name: user.name,
    balance: user.balance
  };

  return { success: true, data: userData };
};

// 获取用户购买的课程列表
const getPurchasedCourses = async (userId, page, limit, title, teacherName) => {
  const offset = (page - 1) * limit;
  let whereClauses = ['uc.userId = ?'];
  const replacements = [userId];

  if (title) {
    whereClauses.push('c.title LIKE ?');
    replacements.push(`%${title}%`);
  }
  if (teacherName) {
    whereClauses.push('t.name LIKE ?');
    replacements.push(`%${teacherName}%`);
  }

  const whereString = whereClauses.join(' AND ');

  // 查询课程列表
  const coursesQuery = `
    SELECT
      c.courseId,
      c.title,
      c.image,
      c.description,
      t.name AS teacher
    FROM course c
    JOIN user_course uc ON c.courseId = uc.courseId
    LEFT JOIN teacher t ON c.teacherId = t.id
    WHERE ${whereString}
    LIMIT ? OFFSET ?
  `;
  const list = await sequelize.query(coursesQuery, {
    replacements: [...replacements, limit, offset],
    type: QueryTypes.SELECT,
  });

  // 查询总数
  const countQuery = `
    SELECT COUNT(*) as total
    FROM course c
    JOIN user_course uc ON c.courseId = uc.courseId
    LEFT JOIN teacher t ON c.teacherId = t.id
    WHERE ${whereString}
  `;
  const countResult = await sequelize.query(countQuery, {
    replacements,
    type: QueryTypes.SELECT,
  });
  
  const total = countResult[0].total;

  return { success: true, data: { total, list } };
};

// 充值
const recharge = async (userId, amount) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { success: false, message: '用户不存在' };
  }
  user.balance = parseFloat(user.balance) + parseFloat(amount);
  await user.save();
  return { success: true, data: { balance: user.balance } };
};

// 查询用户余额
const getBalance = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['balance']
  });
  if (!user) {
    return { success: false, message: '用户不存在' };
  }
  return { success: true, data: user };
};

// 获取用户信息（不包含密码）
const getUserById = async (studentId) => {
  console.log(studentId);
  const users = await sequelize.query(
    'SELECT `studentId`, `balance`, `name` FROM `user` WHERE `studentId` = ?',
    {
      replacements: [studentId],
      type: QueryTypes.SELECT,
    }
  );
  console.log(users);
  console.log("u111233sers");
  if (users.length === 0) {
    return { success: false, message: '用户不存在' };
  }

  return { success: true, data: users[0] };
};

// 统一购买接口 - 支持单个或多个课程购买
const purchaseCourses = async (userId, courseIds, clearCart = false) => {
  // 检查用户是否存在
  const user = await User.findByPk(userId);
  if (!user) {
    return { success: false, message: '用户不存在' };
  }
  // 验证课程ID数组
  if (!Array.isArray(courseIds) || courseIds.length === 0) {
    return { success: false, message: '请选择要购买的课程' };
  }
  // 获取课程信息
  const courses = await Course.findAll({
    where: { courseId: courseIds }
  });
  if (courses.length !== courseIds.length) {
    return { success: false, message: '部分课程不存在' };
  }
  // 检查是否已购买过某些课程
  const existingPurchases = await sequelize.query(
    'SELECT courseId FROM user_course WHERE userId = ? AND courseId IN (?)',
    {
      replacements: [userId, courseIds],
      type: QueryTypes.SELECT,
    }
  );
  if (existingPurchases.length > 0) {
    const purchasedCourseIds = existingPurchases.map(item => item.courseId);
    const purchasedCourses = courses.filter(course => purchasedCourseIds.includes(course.courseId));
    const courseNames = purchasedCourses.map(course => course.title).join('、');
    return { success: false, message: `课程"${courseNames}"已购买过` };
  }
  // 计算总价
  const totalPrice = courses.reduce((sum, course) => sum + parseFloat(course.price), 0);
  const balance = parseFloat(user.balance);
  if (balance < totalPrice) {
    return { success: false, message: '余额不足，请先充值' };
  }
  // 扣除余额
  user.balance = balance - totalPrice;
  await user.save();
  // 批量添加到已购课程并创建订单
  for (const course of courses) {
    await sequelize.query(
      'INSERT INTO user_course (userId, courseId) VALUES (?, ?)',
      {
        replacements: [userId, course.courseId],
        type: QueryTypes.INSERT,
      }
    );
    await PurchaseOrder.create({
      userId: userId,
      courseId: course.courseId,
      price: course.price,
      purchaseTime: new Date()
    });
  }
  // 如果指定清空购物车，则从购物车中移除已购买的课程
  if (clearCart) {
    await sequelize.query(
      'DELETE FROM cart WHERE user_id = ? AND course_id IN (?)',
      {
        replacements: [userId, courseIds],
        type: QueryTypes.DELETE,
      }
    );
  }
  return { 
    success: true, 
    message: '购买成功',
    data: { 
      balance: user.balance,
      purchasedCount: courseIds.length,
      totalPrice: totalPrice,
      courseIds: courseIds
    }
  };
};

// 获取用户订单历史
const getOrderHistory = async (userId, page, limit) => {
  const offset = (page - 1) * limit;
  const orders = await PurchaseOrder.findAndCountAll({
    where: { userId },
    include: [{
      model: Course,
      attributes: ['title', 'image'],
      include: [{
        model: Teacher,
        attributes: ['name']
      }]
    }],
    order: [['purchaseTime', 'DESC']],
    limit,
    offset
  });
  return { 
    success: true, 
    data: {
      total: orders.count,
      list: orders.rows
    } 
  };
};

module.exports = {
  register,
  login,
  getPurchasedCourses,
  recharge,
  getBalance,
  getUserById,
  purchaseCourses,
  getOrderHistory
};
