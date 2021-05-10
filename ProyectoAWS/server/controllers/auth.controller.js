const userCtrl = {};
const User = require('../auth.dao')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = "secretkey123456"



userCtrl.createUser = async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    };

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('El email ya existe');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: user.id},
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        // Datos que queremos devolver al Frontend.
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        res.send({dataUser});
    });
}




userCtrl.loginUser = async (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({email: userData.email}, (err, user) => {
        if (err) return res.status(500).send('Server error');
        if (user.length == 0) {
            console.log(user)
            // El email no existe.
            res.status(409).send({message: "Something is wrong"});
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user[0].password);
            if (resultPassword) {
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id}, 
                    SECRET_KEY, 
                    {
                        expiresIn: expiresIn
                    });
                // Datos que queremos devolver al Frontend.
                const dataUser = {
                    name: user[0].name,
                    email: user[0].email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({dataUser})
            } else {
                // La contraseña no ha sido correcta.
                res.status(409).send({message: "Something is wrong"});
            }
        }
    });

}


module.exports = userCtrl;