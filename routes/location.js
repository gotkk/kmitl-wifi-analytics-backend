const router = require('express-promise-router')();
const LocationController = require('../controllers/locationController');

router.route('/lag_lng').get(LocationController.getLatLng);

module.exports = router