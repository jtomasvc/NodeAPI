const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //Autorizacion por header
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT')
        error.status = 401
        throw error
    }

    //obtener el token y verificar
    const token = authHeader.split(' ')[1]
    let revisarToken
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA')
    } catch (error) {
        error.status = 500
        throw error
    }

    //si es un token valido pero con error
    if(!revisarToken) {
        const error = new Error('No autenticado')
        error.status = 401
        throw error
    }

    next()
}