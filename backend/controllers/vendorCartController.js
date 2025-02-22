const VendorCart = require('../models/VendorCart');

module.exports = {
    addProductToCart: async (req, res) => {
        const userId = req.user.id;
        const { productId, totalPrice, quantity, instructions } = req.body;

        try {
            let vendorCart = await VendorCart.findOne({ userId });

            if (vendorCart) {
                const existingItemIndex = vendorCart.cartItems.findIndex(item => item.productId.toString() === productId.toString());
                if (existingItemIndex > -1) {
                    vendorCart.cartItems[existingItemIndex].quantity += quantity;
                    vendorCart.cartItems[existingItemIndex].totalPrice += totalPrice;
                } else {
                    vendorCart.cartItems.push({
                        productId,
                        instructions,
                        quantity,
                        totalPrice
                    });
                }

                vendorCart.totalAmount += totalPrice;
                await vendorCart.save();
            } else {
                const newVendorCart = new VendorCart({
                    userId,
                    cartItems: [{
                        productId,
                        instructions,
                        quantity,
                        totalPrice
                    }],
                    totalAmount: totalPrice
                });

                await newVendorCart.save();
            }

            const count = await VendorCart.countDocuments({ userId });
            res.status(200).json({ status: true, count });
        } catch (error) {
            console.error('Error adding product to cart:', error);
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getCartItems: async (req, res) => {
        const userId = req.user.id;

        try {
            const vendorCart = await VendorCart.findOne({ userId }).populate('cartItems.productId');

            if (!vendorCart) {
                return res.status(404).json({ status: false, message: 'Cart not found' });
            }

            res.status(200).json({ status: true, cartItems: vendorCart.cartItems });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    removeProductFromCart: async (req, res) => {
        try {
            const { userId, productId } = req.query;

            const vendorCart = await VendorCart.findOne({ userId });
            if (!vendorCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            vendorCart.cartItems = vendorCart.cartItems.filter(item => item.productId._id.toString() !== productId);

            await vendorCart.save();
            res.status(200).json({ status: true });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};