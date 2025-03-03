import User from "./user.model.js"
import { hash } from "argon2";


export const updateUser = async (req, res) => {
    try {
        const { id } = req.usuario;
        const data = req.body;

        console.log(id)
        const user = await User.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'User updated',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error while updating the user',
            error: err.message
        });
    }
}

export const defaultUser = async () => {

    const adminUser = {
        "name": "Derian",
        "surname": "Hernández",
        "username": "elPapuPro",
        "role" : "ADMIN",
        "email": "dshgonzalez11@gmail.com",
        "password": "Samedirection14*",
        "phone": "40191129",
    }

    

    const firstUser = await User.findOne({
        $or: [
            { email: adminUser.email },
            { username: adminUser.username }
        ]
    });
    if (!firstUser) {
        adminUser.password = await hash(adminUser.password)
         User.create(adminUser);
        
    }



}
