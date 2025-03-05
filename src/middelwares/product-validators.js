import { body,param } from "express-validator";
import { validarCampos } from "./fields-validator.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productExists, productNameExists } from "../helpers/db-validators.js";



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

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("pid", "No es un ID válido").isMongoId(),
    param("pid").custom(productExists),
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    body("description").optional().notEmpty().withMessage("La descripcion es requerida"),
    body("brand").optional().notEmpty().withMessage("La marca es requerida"),
    body("price").optional().isNumeric().withMessage("El precio es requerido"),
    body("stock").optional().isNumeric().withMessage("Stock debe ser un número"),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("pid", "No es un ID válido").isMongoId(),
    param("pid").custom(productExists),
    validarCampos,
    handleErrors
]

export const getProductByNameValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("the name of the product is required"),
    body("name").custom(productNameExists),
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

