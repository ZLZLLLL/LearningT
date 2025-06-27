const Router = require('koa-router');
const courseController = require('../controllers/courseController');

const router = new Router({
  prefix: '/api/course'
});

router.get('/:id', courseController.getCourseDetail);

module.exports = router;













