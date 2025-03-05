// models/Cart.js
import { Schema, model } from 'mongoose';

export const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Cart = model('Cart', cartSchema)


