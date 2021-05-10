const usuarioCtrl = {};
const Usuario = require('../models/usuario')


usuarioCtrl.getUsuarios = async (req, res) => {
    // res.send("Hello World");
    // res.json({
    //     status: "Employees goes here"
    // })
    const usuarios = await Usuario.find();
    res.json(usuarios);
}

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario({
        faceID: req.body.faceID,
        nombre: req.body.nombre,
        foto: req.body.foto,
        accesos: req.body.accesos
    });
    await usuario.save();
    res.json({
        'status': 'Usuario Guardado'
    });
}


module.exports = usuarioCtrl;