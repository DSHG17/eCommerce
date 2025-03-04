import { Router } from "express";

import { updatePassword, updateUser, updateProfilePicture, deleteUser } from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator, deleteUserValidator } from "../middelwares/user-validators.js";
import { uploadProfilePicture } from "../middelwares/multer-upload.js";
const router = Router();




/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     summary: Update user information.
 *     description: Updates the details of an authenticated user, but only admins can do it.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               name: "Juan"
 *               surname: "Perez"
 *               email: "juanperez@example.com"
 *     responses:
 *       200:
 *         description: User updated
 *       500:
 *         description: Error while updating the user.
 */
router.put("/updateUser",updateUserValidator,updateUser)

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update user password.
 *     description: Allows a user to update their password, but the new password must be different from the old one.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             example:
 *               newPassword: "newSecurePassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: The new password cant be the same as the old one.
 *       500:
 *         description: Error while updating the password.
 */


router.patch("/updatePassword", updatePasswordValidator,updatePassword)


/**
 * @swagger
 * /updateProfilePicture:
 *   patch:
 *     summary: Update a user's profile picture
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: No profile picture has been given
 *       500:
 *         description: Error while updating the profile picture 
 */
router.patch(
    "/updateProfilePicture",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
  );


  /**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user based on the provided user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       500:
 *         description: Error while eliminating the user.
 */
router.delete(
  "/deleteUser",
  deleteUserValidator,
  deleteUser
)

export default router
