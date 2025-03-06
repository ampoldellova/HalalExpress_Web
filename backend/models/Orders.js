const mongoose = require('mongoose')
const populate = require("mongoose-autopopulate");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        autopopulate: true,
    },
    orderItems: [{
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            autopopulate: true,
        },
        additives: {
            type: [],
            default: ''
        },
        instructions: {
            type: String,
            trim: true,
            maxlength: 250,
        },
        quantity: {
            type: Number,
            default: 1
        },
        totalPrice: {
            type: Number,
            required: true
        },
    }],
    deliveryAddress: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    deliveryNote: {
        type: String,
        trim: true,
        maxlength: 250,
    }
}, { timestamps: true });

orderSchema.plugin(populate);
module.exports = mongoose.model('Order', orderSchema)