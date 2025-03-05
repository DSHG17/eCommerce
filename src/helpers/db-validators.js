import User from "../user/user.model.js";
import Product from '../product/product.model.js'

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const productExists = async (pid = "") =>{
    const existe = await Product.findById(pid)
    if(!existe){
        throw new Error("No existe el producto proporcionado")
    }
}

export const productNameExists = async (name = "") =>{
    const existe = await Product.findOne({name})
    if(!existe){
        throw new Error("No existe el producto con el nombre proporcionado")
    }
}

