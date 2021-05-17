const morgan = require('morgan');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const { mongoose } = require('./database');

// Settings
//app.set('port', 3000);
app.set('port', process.env.PORT || 3000);   // Para utilizar el puerto que nos envía el proveedor de la nube.


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))




// Routes
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/usuario.routes'));





//*********************************************************************************
// BUILD + MIDDLEWARE STATIC (Lo único necesario para el despliegue)
//*********************************************************************************

// Con esto le decimos a express que la carpeta de "angular" (el build del proyecto de Angular) contiene archivos estáticos.
// Es un middleware que nos va a permitir leer el build de Angular (archivos como imágenes, css o js).
app.use(express.static(path.join(__dirname, '/angular/')));

// Con esto le indicamos que vamos a utilizar el build de Angular, usando su index.html.
app.get('*',function(req,res){
    // console.log(__dirname);
    // console.log(path);
    res.sendFile(path.join(__dirname+'/angular/index.html'));
});






// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});