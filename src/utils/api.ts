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

/**
 * Register personal account against backend service.
 * Sends POST to http://backend:8082/auth/personal/register
 */
export const registerPersonalAccount = async (data: {
  name: string;
  age: number | null;
  gender: string;
  email: string;
  phoneNo: string;
  zipCode: string;
  macAddress?: string;
  pwd: string;
}): Promise<{ success: boolean }> => {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8082';
  const url = `${base.replace(/\/$/, '')}/auth/personal/register`;

  const payload = {
    name: data.name,
    age: data.age ?? 0,
    gender: data.gender,
    email: data.email,
    phoneNo: data.phoneNo,
    zipCode: data.zipCode,
    macAddress: data.macAddress ?? getOrCreatePseudoMac(),
    pwd: data.pwd
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (res.ok) return { success: true };

  const text = await res.text().catch(() => '');
  throw new Error(`Registration failed: ${res.status} ${text}`);
};
const getOrCreatePseudoMac = (): string => {
  try {
    const key = 'publi_connect_device_mac';
    const existing = localStorage.getItem(key);
    if (existing && existing.length) return existing;
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    const mac = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join(':');
    localStorage.setItem(key, mac);
    return mac;
  } catch (e) {
    return '00:00:00:00:00:00';
  }
};
