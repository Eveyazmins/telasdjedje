const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
//Crear el servidor de express
const app = express();
const path = require('path');

//Base de datos
dbConnection();

//CORS

app.use(cors());

//Directorio publico
app.use(express.static('public'));

/*
// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});*/

//Lectura y parseo del body
app.use(express.json());

// //Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cliente', require('./routes/cliente'));
app.use('/api/venta',require('./routes/venta'));
app.use('/api/factura',require('./routes/factura'));
app.use('/api/remitoHilanderia', require('./routes/remitoHilanderia'));
app.use('/api/remitoTintoreria', require('./routes/remitoTintoreria'));
app.use('/api/solicitudTintoreria', require('./routes/solicitudTintoreria.js'));
app.use('/api/stock', require('./routes/stock'));

//Escuchar peticiones
app.listen(process.env.PORT, ()=>{console.log(`Servidor corriendo en puerto ${process.env.PORT}`)});

//
