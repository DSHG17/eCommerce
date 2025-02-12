export const hasRoles = (...roles) => {
    return(req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "Se requiere validar el role antes de validar el token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message: `Usuario no autorizado, El recurso requiere que el usuario no tenga este rol: ${roles}`
            })
        }
        next()
    }
}