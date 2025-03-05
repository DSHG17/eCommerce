import { Router } from "express";
import { createProductValidator, deleteProductValidator, getProductByNameValidator, getProductsValidator, updateProductValidator } from "../middelwares/product-validators.js";
import { deleteProduct, getBestSellers, getProductByName, getProducts, getProductsOutOfStock, saveProduct, updateProduct } from "./product.controller.js";
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

/**
 * @swagger
 * /updateProduct/{pid}:
 *   put:
 *     summary: Update an existing product
 *     description: Updates a product with the given `pid` and new data.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update.
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
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error while updating the product.
 */

router.put(
    "/updateProduct/:pid",
    updateProductValidator,
    updateProduct
)


/**
 * @swagger
 * /deleteProduct/{pid}:
 *   delete:
 *     summary: Soft delete a product
 *     description: Marks a product as deleted by setting its status to false.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       500:
 *         description: Error while deleting the product.
 */
router.delete(
    "/deleteProduct/:pid",
    deleteProductValidator,
    deleteProduct
)

router.get(
    "/getProductsByName",
    getProductByNameValidator,
    getProductByName
)
export default router