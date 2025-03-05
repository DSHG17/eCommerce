import { body,param } from "express-validator";
import { validarCampos } from "./fields-validator.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { emailExists, usernameExists,userExists } from "../helpers/db-validators.js";
import { hasRoles } from "./validate-roles.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { isActive, isActiveParam } from "./validate-status.js";


export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    deleteFileOnError,
    validarCampos,
    handleErrors
]

export const loginValidator = [
    isActive(),
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    body("newPassword").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const changeRoleValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    isActiveParam(),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const deleteOtherUserValidator =[
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]