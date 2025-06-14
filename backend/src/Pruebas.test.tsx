import {beforeAll, afterAll, describe, it, expect} from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // Usaremos una base de datos en memoria


describe ('mi primer test', () =>{
    it ('la suma de dos numeros',()=>{
        const suma = (a: number, b: number): number => a + b;
	    const resultado = suma(2,3);
	    expect (resultado).toBe (5);
    })
})


describe('Conexión a la base de datos', () => {
  let mongoServer: MongoMemoryServer;

  // Iniciar el servidor en memoria
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri); // Conectamos a la base de datos en memoria
  });

  // Después de todas las pruebas, cerramos la conexión
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop(); // Detenemos el servidor en memoria
  });

  it('debería conectarse correctamente a MongoDB', async () => {
    const estadoConexion = mongoose.connection.readyState; // Estado de la conexión
    expect(estadoConexion).toBe(1); // 1 significa que está conectado
  });
});



import User from './models/User';

describe('Modelo de Usuario', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('debería crear un usuario correctamente', async () => {
    const usuario = new User({
      username: 'Juan Pérez',
    });

    const savedUser = await usuario.save();
    expect(savedUser.username).toBe('Juan Pérez');
  });

  it('debería fallar si el campo name es obligatorio', async () => {
    const usuario = new User({
      username: '',
    });

    await expect(usuario.save()).rejects.toThrow('User validation failed');
  });
});

