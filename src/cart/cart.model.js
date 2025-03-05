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
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    total: {
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default model("Cart", cartSchema)


