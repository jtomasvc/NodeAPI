const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    email: {
        type: 'string',
        unique:true,
        lowercase: true,
        trim:true
    },
    nombre: {
        type: 'string',
        required: 'Agrega tu nombre'
    },
    password: {
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model('Usuarios', usuariosSchema)