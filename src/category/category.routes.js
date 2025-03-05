import Router from "express"
import { createCategoryValidator, getCategoriesValidator } from "../middelwares/category-validators.js"
import { createCategory, getCategories } from "./category.controller.js"
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

/**
 * @swagger
 * /getCategories:
 *   get:
 *     summary: Get all categories
 *     description: Fetches all categories from the database.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully fetched all categories.
 *       500:
 *         description: Error while getting the categories.
 */
router.get(
    "/getCategories",
    getCategoriesValidator,
    getCategories
)

export default router