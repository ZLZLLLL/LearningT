const Router = require('koa-router');
const adminController = require('../controllers/adminController');

const router = new Router({
  prefix: '/api/admin'
});

// 管理员登录
router.post('/login', adminController.login);

// 管理课程
router.get('/courses', adminController.getCourses);
router.get('/course/:id', adminController.getCourseForEdit);
router.post('/course/add', adminController.addCourse);
router.post('/course/update', adminController.updateCourse);
router.post('/course/delete', adminController.deleteCourse);

// 获取教师列表
router.get('/teachers', adminController.getTeachers);

module.exports = router; 