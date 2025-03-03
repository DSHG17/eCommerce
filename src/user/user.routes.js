import { Router } from "express";

import { updatePassword, updateUser } from "./user.controller.js";
import { updatePasswordValidator, updateUserValidator } from "../middelwares/user-validators.js";

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

export default router
