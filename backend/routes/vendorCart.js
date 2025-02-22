const router = require('express').Router();
const vendorCartController = require('../controllers/vendorCartController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyAndAuthorization, vendorCartController.addProductToCart);
router.get('/', verifyAndAuthorization, vendorCartController.getCartItems);
router.delete('/remove-product', verifyAndAuthorization, vendorCartController.removeProductFromCart);

module.exports = router;