const router = require('express').Router();
const vendorOrderController = require('../controllers/vendorOrderController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');

router.post('/check-out', verifyAndAuthorization, vendorOrderController.checkoutOrder);

module.exports = router;