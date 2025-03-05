import Cart from "../cart/cart.model.js"

export const createCart = async(req,res) =>{
    try{
        const { email, username, password } = req.body

        const user = await User.findOne({
                    $or:[{email: email}, {username: username}]
                })
        const cart = {
            "user": user.id
        }


        const sCart = await Cart.findOne({user: uid})
        if(!sCart){
            await Cart.create(cart)
        }
        
        
    }catch(err){
        return res.status(500).json({
          success: false,
          message: 'error while creating the shopping cart'
        })
    }
}