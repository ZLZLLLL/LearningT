const Router = require('koa-router');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

const router = new Router({
  prefix: '/api/user'
});

// 不需要认证的路由
router.post('/login', userController.login);
router.post('/register', userController.register);

// 需要认证的路由
router.post('/logout', authMiddleware, userController.logout);
router.get('/current', authMiddleware, userController.getCurrentUser);
router.get('/courses', authMiddleware, userController.getPurchasedCourses);
router.post('/recharge', authMiddleware, userController.recharge);
router.get('/balance', authMiddleware, userController.getBalance);
router.post('/purchase', authMiddleware, userController.purchaseCourses);
router.get('/purchase-records', authMiddleware, userController.getPurchaseRecords);
router.get('/orders', authMiddleware, userController.getOrderHistory);

module.exports = router;
