const mongoose = require('mongoose');
const { Schema } = mongoose;


//*********************************************************************************
// CREACIÓN DEL MODELO (SCHEMA) DE LOS USUARIOS
//*********************************************************************************

// Creamos el Schema de usuarios
const UsuarioSchema = new Schema ({
    faceID : { type: String, required: true},
    nombre : { type: String, required: true },
    foto : { type: String, required: true},
    accesos : { type: Array(), required: false },

},{
    timestamps: true    // Guarda en nuestra colección la fecha de creación y de actualización.
});

// Necesitamos pasar estos datos a un modelo de datos de Mongoose
module.exports = mongoose.model('Usuario', UsuarioSchema); // Exportamos el modelo de Usuario