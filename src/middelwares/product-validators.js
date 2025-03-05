import { body,param } from "express-validator";
import { validarCampos } from "./fields-validator.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";



export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripcion es requerida"),
    body("brand").notEmpty().withMessage("La marca es requerida"),
    body("price").isNumeric().withMessage("El precio es requerido"),
    body("stock").optional().isNumeric().withMessage("Stock debe ser un número"),
    validarCampos,
    handleErrors
]

export const getProductsValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

