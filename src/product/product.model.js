import { Schema, model} from "mongoose";

const productSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    category:{
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    },
    products:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    price:{
        type: Number
    },
    brand:{
        type: String,
        required: [true, "Brand is required"]
    },
    stock:{
        type: Number,
        default: 1
    },
    soldCantity:{
        type: Number,
        default: 0
    },  
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Product", productSchema)