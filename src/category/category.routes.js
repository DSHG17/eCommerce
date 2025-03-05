import Router from "express"
import { createCategoryValidator } from "../middelwares/category-validators.js"
import { createCategory } from "./category.controller.js"
const router = Router()


/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category to the database.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *     responses:
 *       200:
 *         description: Category created successfully.
 *       500:
 *         description: Error while creating the category.
 */
router.post(
    "/createCategory",
    createCategoryValidator,
    createCategory
)

export default router