const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');

router.post('/check-out', verifyAndAuthorization, orderController.checkoutOrder);

module.exports = router;