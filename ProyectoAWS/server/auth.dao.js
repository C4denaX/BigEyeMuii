const mongoose = require('mongoose');   // Importamos mongoose.
const AuthSchema = require('./models/auth');  // Importamos el modelo de Auth.



// Aquí dentro creamos los métodos que usamos en el controlador.
AuthSchema.statics = {
    // Creamos el método "create"
    create: function(data, callback) {
        const user = new this(data);    // Variable donde almacenaremos al nuevo usuario que se nos pasa en "data".
        user.save(callback);    // Guardamos el usuario en la BDD, pasándole el callback.   
    },

    // Creamos el método "findOne" (login)
    findOne: function(query, callback) {
        this.find(query, callback);   // Bucamos en la BDD con los datos que se nos pasa en "query".
    },

    // Creamos el método "updateOne"
    updateOne: function(data, callback) {
    
    }
}

module.exports = mongoose.model('User', AuthSchema);