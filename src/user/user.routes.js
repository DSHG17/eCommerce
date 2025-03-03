import { Router } from "express";

import { updateUser } from "./user.controller.js";
import { updateUserValidator } from "../middelwares/user-validators.js";

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

export default router
