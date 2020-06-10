const router = require('express-promise-router')();
const TestController = require('../controllers/testController');

router.route('/a/:text').get(TestController.getTest);


module.exports = router;


