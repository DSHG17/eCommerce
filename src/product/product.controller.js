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