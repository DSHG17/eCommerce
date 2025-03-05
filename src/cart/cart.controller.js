import Cart from "../cart/cart.model.js"

export const createCart = async(req,res) =>{
    try{
        const {uid} = req.usuario

        
    }catch(err){
        return res.status(500).json({
          success: false,
          message: 'error while creating the shopping cart'
        })
    }
}