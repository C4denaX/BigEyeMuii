const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.get('/usuarios', usuario.getUsuarios);
router.post('/usuarios', usuario.createUsuario);


module.exports = router;