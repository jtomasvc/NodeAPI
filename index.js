const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path:'variables.env'})

//Permitiendo Cors
const cors = require('cors')

//Conectar mongo
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

//Crear servidor 
const app = express();

//Habilitar bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Definir uno dominio(s) para recibir peticiones
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin, callback) => {
        //Revisar si la peticion viene de un servidor de la lista blanca
        const existe = whiteList.some(dominio => dominio === origin)
        if(existe) {
            callback(null, true)
        } else {
            callback(new Error('no permitido por CORS'))
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions))

// Rutas de la App
app.use('/', routes())

//Carpeta publica
app.use(express.static('uploads'))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT    || 5000

//puerto
app.listen(port, host, () => {
    console.log('el servidor funciona')
})