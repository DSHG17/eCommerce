import { Router } from "express";
import { createProductValidator } from "../middelwares/product-validators.js";
import { saveProduct } from "./product.controller.js";
const router = Router();


/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the database.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 description: Category ID
 *               onSale:
 *                 type: boolean
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product created successfully.
 *       500:
 *         description: Error while saving the product.
 */
router.post(
    "/createProduct",
    createProductValidator,
    saveProduct
)

export default router