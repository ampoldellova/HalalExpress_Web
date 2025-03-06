const Order = require('../models/Order')
const Cart = require('../models/Cart')

module.exports = {
    checkoutOrder: async (req, res) => {
        const userId = req.user.id;
        const {
            restaurant,
            orderItems,
            deliveryAddress,
            subTotal,
            deliveryFee,
            totalAmount,
            paymentMethod,
            paymentStatus,
            orderStatus,
            orderNote
        } = req.body;

        try {
            const cart = await Cart.findOne({ userId }).populate('cartItems.foodId');

            if (!cart) {
                return res.status(404).json({ status: false, message: 'Cart not found' });
            }
            console.log(subTotal)
            const newOrder = new Order({
                userId,
                restaurant,
                orderItems,
                deliveryAddress,
                subTotal,
                deliveryFee,
                totalAmount,
                paymentMethod,
                paymentStatus,
                orderStatus,
                orderNote,
            });

            await newOrder.save();

            cart.cartItems = [];
            cart.totalAmount = 0;
            await cart.save();

            res.status(200).json({ status: true, message: 'Order placed successfully', order: newOrder });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getUserOrders: async (req, res) => {
        const userId = req.user.id;

        try {
            const orders = await Order.find({ userId }).sort({ createdAt: -1 });

            if (!orders) {
                return res.status(404).json({ status: false, message: 'No order found' });
            }

            res.status(200).json({ status: true, orders });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: false, message: error.message });
        }
    }
};