import User from "./user.model.js"
import { hash, verify } from "argon2";
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))


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

export const updatePassword = async(req,res) =>{
    try {
        const { id } = req.usuario;
        const { newPassword } = req.body;

        const user = await User.findById(id)

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "The new password cant be the same as the old one"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password udpated sucessfuly",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the password",
            error: err.message
        });
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const { id } = req.usuario;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No profile picture has been given.',
            });
        }

        const user = await User.findById(id);
        

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath)
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Profile picture updated',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error while updating the profile picture',
            error: err.message
        });
    }
};

export const deleteUser = async (req, res) => {
        try {
            const { id } = req.usuario
    
            const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error while eliminating the user",
                error: err.message
            });
        }
    }

export const updateRole = async (req,res) =>{
    try{
        const {uid} = req.params
        const {role} = req.body

        const user = await User.findByIdAndUpdate(uid,role,{new: true})
        
        return res.status(200).json({
            success: true,
            message: "Role updated succesfully",
            user
        });
       
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while updating the role",
            error: err.message
        })
    }
}