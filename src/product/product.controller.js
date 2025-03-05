import Product from "../product/product.model.js"

export const saveProduct = async(req,res) =>{
    try{
        const data = req.body
        
        await Product.create(data)

        res.status(200).json({
            success: true,
            message: 'Product created successfully'
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while saving the product'
        })
    }
}

export const getProducts = async(req,res) =>{
    try{
        const products = await Product.find()

        res.status(200).json({
            success: true,
            products: products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while getting the whole catalog'
        })
    }
}




export const getProductsOutOfStock = async(req,res) =>{
    try{
        const products = await Product.find({ stock: 0  })

        res.status(200).json({
            success: true,
            products: products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while getting the out of stock items'
        })
    }
}

export const getBestSellers = async(req,res) =>{
    try{
        const products = await Product.find().sort({soldCantity: -1})

        res.status(200).json({
            success: true,
            products: products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while getting the best Sellers'
        })
    }
}

export const updateProduct = async(req,res) =>{
    try{
        const {pid} = req.params
        const data = req.body


        if(!data || Object.keys(data).length === 0){
            return res.status(200).json({
                success: true,
                message: "Nothing was changed cause there was not changes in the request"
            })
        }
        const product = await Product.findByIdAndUpdate(pid,data,{new: true})
        
        return res.status(200).json({
            success: true,
            message: "product updated sucessfully",
            product: product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while updating the product'
        })
    }
}

export const deleteProduct = async(req, res) =>{
    try{
        const {pid} = req.params

        await Product.findByIdAndUpdate(pid,{status: false},{new: true})

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error while deleting the user'
        })
    }
}