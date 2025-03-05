import { Router } from "express";
import { createProductValidator, getProductsValidator } from "../middelwares/product-validators.js";
import { getBestSellers, getProducts, getProductsOutOfStock, saveProduct } from "./product.controller.js";
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


/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: Get all products
 *     description: Fetches all the products in the catalog.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully fetched all products.
 *       500:
 *         description: Error while getting the products.
 */
router.get(
    "/getProducts",
    getProductsValidator,
    getProducts
)
/**
 * @swagger
 * /getProducsOutOfStock:
 *   get:
 *     summary: Get products out of stock
 *     description: Fetches all the products with zero stock.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully fetched all out-of-stock products.
 *       500:
 *         description: Error while getting the out of stock items.
 */

router.get(
    "/getProducsOutOfStock",
    getProductsValidator,
    getProductsOutOfStock
)

/**
 * @swagger
 * /getBestSellers:
 *   get:
 *     summary: Get top-selling products
 *     description: Fetches products sorted by the highest sold quantity.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully fetched the top-selling products.
 *       500:
 *         description: Error while getting the best-selling products.
 */
router.get(
    "/getBestSellers",
    getProductsValidator,
    getBestSellers
)

export default router