require('dotenv').config();

const app = require('./app');
require('./database');

async function main() {
    //app.listen(4000, () => console.log('Servidor en el puerto 4000'))
    await app.listen(app.get('port'));
    console.log('Servidor en el puerto', app.get('port'))
}

main();