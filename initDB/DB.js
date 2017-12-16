'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

const fs = require('fs');

const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error de conexión a la base de datos', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Conectado a mongoDB en ${mongoose.connection.name}`);

    dropDB()
    .then(insertDataDB)
    .then( () => {
        console.log ('DB inicializada con datos mock');
        process.exit(0);
    })
    .catch(err => {
        console.log("Error:", err.message);
        process.exit(1);
    });
});

mongoose.connect('mongodb://localhost/nodepop', {useMongoClient: true});

async function dropDB() {
    console.log("Entrando en borrado de DB");

    const drAnuncios = await dropAnuncios();
    const drUsuarios = await dropUsuarios();

    await Promise.all([drAnuncios, drUsuarios])
}

function dropAnuncios() {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropCollection('anuncios', (err, result) => {
            if (err) {
                console.log('Error borrando anuncios', err.message)
            }

            resolve();
        });
    });
}  

function dropUsuarios() {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropCollection('usuarios', (err, result) => {
            if (err) {
                console.log('Error borrando usuarios', err.message)
            }

            resolve();
        });
    });
}

async function insertDataDB() {
    console.log ("Iniciando inserts");

    await insertAnuncios();
    await insertUsuarios();
}

async function insertAnuncios() {
    let json = JSON.parse(fs.readFileSync(__dirname + "/anuncios.json", 'utf8')).anuncios;

    for(let i=0; i < json.length; i++){
        console.log('Insertado registro de anuncio: '+ json[i].nombre);
        await new Anuncio(json[i]).save();
    }
    console.log(json.length+ ' anuncios insertados');
}

async function insertUsuarios() {
    let json = JSON.parse(fs.readFileSync(__dirname + "/usuarios.json", 'utf8')).usuarios;

    for(let i=0; i < json.length; i++){
        await new Usuario(json[i]).save();
    }
    console.log('+ '+json.length+' usuarios insertados');
}
