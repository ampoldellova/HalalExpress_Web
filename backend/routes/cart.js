const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verifyAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyAndAuthorization, cartController.addFoodToCart);
router.get('/', verifyAndAuthorization, cartController.getCartItems);
router.delete('/remove-food', verifyAndAuthorization, cartController.removeFoodFromCart);
router.patch('/increment/:id', verifyAndAuthorization, cartController.incrementCartItemQuantity);
router.patch('/decrement/:id', verifyAndAuthorization, cartController.decrementCartItemQuantity);

module.exports = router;