import Cart from "../cart/cart.model.js"

export const createCart = async(user) =>{
        const cart = {
            "user": user
        }
        const sCart = await Cart.findOne({user: user})
        if(!sCart){
            await Cart.create(cart)
        }
        

}