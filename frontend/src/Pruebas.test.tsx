import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateUser from './components/CreateUser';
import axios from 'axios';
import React from 'react';

// Simula funciones para no enviar solicitudes al backend
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

// Especifica las funciones que se van a simular con mockedAxios
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
};

describe ('mi primer test', () =>{
    it ('la suma de dos numeros',()=>{
        const suma = (a: number, b: number): number => a + b;
	    const resultado = suma(2,3);
	    expect (resultado).toBe (5);
    })
})

describe('CreateUser', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: [{ _id: '1', username: 'Juan' }] });
    mockedAxios.post.mockResolvedValue({ data: {} });
  });

  it('Busca el usuario para verificar que si se creo', async () => {
    render(<CreateUser />);
    await waitFor(() => {
      expect(screen.getByText('Juan')).toBeInTheDocument();
    });
  });

  it('debería enviar un nuevo usuario al hacer submit', async () => {
    mockedAxios.post.mockResolvedValue({});

    render(<CreateUser />);
    const input = screen.getByRole('textbox');
    const boton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(input, { target: { value: 'Lucía' } });
    fireEvent.click(boton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:4000/api/users', {
        username: 'Lucía'
      });
    });
  });
});