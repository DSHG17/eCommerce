import { Router } from "express";
import { addToCart } from "./cart.controller.js";
const router = Router();


/**
 * @swagger
 * /updateCart:
 *   put:
 *     summary: Actualiza el carrito de compras
 *     description: Agrega productos al carrito, actualizando su cantidad si ya existen.
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos para actualizar el carrito.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cid:
 *               type: string
 *               example: "67c8c33bde94cd46d5e08c97"
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     example: "67c8ce373aa3dbe5bfecaf4b"
 *                   quantity:
 *                     type: number
 *                     example: 2
 *     responses:
 *       200:
 *         description: Carrito actualizado con éxito.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Productos agregados al carrito"
 *             cart:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67c8c33bde94cd46d5e08c97"
 *       400:
 *         description: Error en los productos o en el carrito.
 *       500:
 *         description: Error del servidor.
 */

router.put(
    "/updateCart",
    addToCart
)

export default router
