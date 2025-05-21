import {describe, it, expect} from 'vitest';

describe ('mi primer test', () =>{
    it ('la suma de dos numeros',()=>{
        const suma = (a: number, b: number): number => a + b;
	    const resultado = suma(2,3);
	    expect (resultado).toBe (5);
    })
})


//const UserModel = require('./models/User');
import UserModel from './models/User';

describe('Pruebas de Base de Datos', () => {
  it('Debe crear un usuario correctamente', async () => {
    const newUser = await UserModel.create({ username: 'Juan' });
    expect(newUser.username).toBe('Juan');
  });
});

