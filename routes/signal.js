const router = require('express-promise-router')();
const signalController = require('../controllers/signalController');

router.route('/dbm/:building_code/:form_id').get(signalController.getDbm);

module.exports = router