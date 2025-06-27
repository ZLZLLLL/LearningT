const Router = require('koa-router');
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

const router = new Router({
  prefix: '/api/cart'
});

router.post('/add', authMiddleware, cartController.add);
router.get('/list', authMiddleware, cartController.list);
router.post('/remove', authMiddleware, cartController.remove);

module.exports = router; 