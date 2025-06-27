const Router = require('koa-router');
const shopController = require('../controllers/shopController');

const router = new Router({
  prefix: '/api/shop'
});

router.get('/courses', shopController.getAllCourses);

module.exports = router; 