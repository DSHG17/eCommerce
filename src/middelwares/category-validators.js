import { body, param} from "express-validator";
import { validarCampos } from "../middelwares/fields-validator.js"
import { categoryExist, nameCategoryExist } from "../helpers/db-validators.js"
import { handleErrors } from "../middelwares/handle-errors.js"
import { validateJWT } from "../middelwares/validate-jwt.js"
import { hasRoles } from "../middelwares/validate-roles.js"

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name", "The name is required").notEmpty(),
    body("name").custom(nameCategoryExist),
    body("description", "The description is required").notEmpty(),  
    validarCampos,
    handleErrors
]

export const getCategoriesValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid", "No es un ID válido de MongoDB").isMongoId(),
    param("cid").custom(categoryExist),
    body("name").custom(nameCategoryExist),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid", "No es un ID válido de MongoDB").isMongoId(),
    param("cid").custom(categoryExist),
    validarCampos,
    handleErrors
]
