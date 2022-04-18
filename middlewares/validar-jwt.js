const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la peticiòn'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKAEY);

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario){
            res.status(401).json({
                msg: 'token no valido - usuario no existe en bd'
            })
        }

        //Verificar si el uid esta en true
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'token no valido - usuario con estdo false'
            })
        }
        req.usuario = usuario;
        
        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
    }


}

module.exports = {
    validarJWT
}