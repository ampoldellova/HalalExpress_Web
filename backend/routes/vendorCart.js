const router = require('express').Router();
const vendorCartController = require('../controllers/vendorCartController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyAndAuthorization, vendorCartController.addProductToCart);
router.get('/', verifyAndAuthorization, vendorCartController.getCartItems);

module.exports = router;