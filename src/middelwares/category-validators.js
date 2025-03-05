import { body} from "express-validator";
import { validarCampos } from "../middelwares/fields-validator.js"
import { nameCategoryExist } from "../helpers/db-validators.js"
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