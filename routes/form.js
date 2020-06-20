const router = require('express-promise-router')();
const FormController = require('../controllers/formController');

router.route('/:building_code').get(FormController.getFormDataFromBuildingCode);

module.exports = router