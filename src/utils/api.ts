/**
 * API Services
 * Mock API functions for authentication and data fetching
 */

import type { CurpData } from '@/types/auth';

/**
 * Simulated API call to fetch CURP data
 * TODO: Replace with actual API endpoint
 */
export const fetchCurpData = async (curp: string): Promise<CurpData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        curp: curp.toUpperCase(),
        nombres: 'ALEJANDRO',
        apellidoPaterno: 'LOPEZ',
        apellidoMaterno: 'PEREZ',
        genero: 'HOMBRE',
        fechaNacimiento: '15/08/1995',
        estado: 'CIUDAD DE MEXICO'
      });
    }, 1500);
  });
};

/**
 * Simulated login API call
 * TODO: Replace with actual authentication endpoint
 */
export const loginUser = async (
  _method: 'phone' | 'email',
  _value: string,
  _password: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, token: 'mock_token_' + Date.now() });
    }, 2000);
  });
};

/**
 * Simulated register API call
 * TODO: Replace with actual registration endpoint
 */
export const registerUser = async (_data: {
  telefono: string;
  correo: string;
  contrasena: string;
  codigoPostal: string;
}): Promise<{ success: boolean; token?: string; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, token: 'mock_token_' + Date.now() });
    }, 2000);
  });
};
