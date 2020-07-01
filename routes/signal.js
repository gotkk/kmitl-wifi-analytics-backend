const router = require('express-promise-router')();
const signalController = require('../controllers/signalController');

router.route('/dbm/:building_code/:form_id').get(signalController.getDbm);
router.route('/ch_counter/:form_id').get(signalController.getChannelCounter);

module.exports = router