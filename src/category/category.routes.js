import Router from "express"
import { createCategoryValidator, deleteCategoryValidator, getCategoriesValidator, updateCategoryValidator } from "../middelwares/category-validators.js"
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js"
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

/**
 * @swagger
 * /updateCategory/{cid}:
 *   put:
 *     summary: Update a category
 *     description: Updates an existing category based on the provided category ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New category name
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       500:
 *         description: Error while updating the category.
 */
router.put(
    "/updateCategory/:cid",
    updateCategoryValidator,
    updateCategory
)


router.delete(
    "/deleteCategory/:cid",
    deleteCategoryValidator,
    deleteCategory
)

export default router