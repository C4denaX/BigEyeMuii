const morgan = require('morgan');
const express = require('express');
const app = express();
const cors = require('cors');

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


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});