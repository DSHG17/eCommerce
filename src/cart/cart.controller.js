import Cart from "../cart/cart.model.js"
import Product from "../product/product.model.js"

export const createCart = async(user) =>{
        const cart = {
            "user": user
        }
        const sCart = await Cart.findOne({user: user})
        if(!sCart){
            await Cart.create(cart)
        }
}

export const addToCart = async (req,res) =>{
    try {
        const { cid, products } = req.body;

        let cart = await Cart.findById(cid)
        .populate("products.product", "name -_id")
        .populate("user", "name -_id")

        if (cart.status === false) {
            return res.status(400).json({ message: "El carrito está deshabilitado." });
        }

        const productIds = products.map(p => p.productId);
        const dbProducts = await Product.find({ _id: { $in: productIds } });

        const stockError = products.some(({ productId, quantity }) => {
            const product = dbProducts.find(p => p._id.toString() === productId);
            return !product || product.stock < quantity;
        });

        if (stockError) {
            return res.status(400).json({ message: "Uno o más productos no tienen stock suficiente o no existen." });
        }

        products.forEach(({ productId, quantity }) => {
            const item = cart.products.find(p => p.product.equals(productId));
            if (item) {
                item.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        });

        cart.total = cart.products.reduce((sum, item) => {
            const product = dbProducts.find(p => p._id.toString() === item.product.toString());
            return sum + (product?.price || 0) * item.quantity;
        }, 0);

        await cart.save();

        return res.status(200).json({ message: "Productos agregados al carrito", cart });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while updating the shopping cart',
            err: err.message
        })
    }
}