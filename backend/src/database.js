const mongoose = require('mongoose');

console.log('mensaje:')
console.log(process.env.MONGODB_URI)
const URI = process.env.MONGODB_URI;

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Base de datos conectada')
});