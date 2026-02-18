/**
 * API Services
 * HTTP services for authentication and data fetching
 */

import type { CurpData } from '@/types/auth';

const DEFAULT_BACKEND_URL = 'http://localhost:8080/api/v1';
const CSRF_HEADER = 'X-XSRF-TOKEN';
const UNAUTHORIZED_MESSAGE = 'Credenciales inválidas';
const CONFLICT_MESSAGE = 'El correo ya está registrado';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const getBaseUrl = () => (import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, '');

const readErrorMessage = async (res: Response): Promise<string> => {
  if (res.status === 401) return UNAUTHORIZED_MESSAGE;
  if (res.status === 409) return CONFLICT_MESSAGE;

  const text = await res.text().catch(() => '');
  if (!text) return `Error HTTP ${res.status}`;

  try {
    const parsed = JSON.parse(text) as { message?: string; detail?: string; error?: string };
    return parsed.detail || parsed.message || parsed.error || `Error HTTP ${res.status}`;
  } catch {
    return text;
  }
};

export interface LoginAccountPayload {
  email: string;
  pwd: string;
}

export interface RegisterUserPayload {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  email: string;
  phoneNo: string;
  zipCode: string;
  macAddress: string;
  pwd: string;
}

interface CsrfResponse {
  csrfToken: string;
}

export const fetchCurpData = async (curp: string): Promise<CurpData> => {
  const normalizedCurp = curp.trim().toUpperCase();
  const url = `${getBaseUrl()}/public/curp/${encodeURIComponent(normalizedCurp)}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 400) throw new ApiError('CURP inválida', 400);
    if (res.status === 404) throw new ApiError('Servicio no disponible en backend actual', 404);
    throw new ApiError('Error al validar CURP, intenta de nuevo', res.status);
  }

  return (await res.json()) as CurpData;
};

export const validateCurp = fetchCurpData;

export const getCsrfToken = async (): Promise<string> => {
  const url = `${getBaseUrl()}/auth/csrf`;
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const message = await readErrorMessage(res);
    throw new ApiError(message, res.status);
  }

  const data = (await res.json()) as CsrfResponse;
  if (!data?.csrfToken) {
    throw new ApiError('No se recibió csrfToken del backend', 500);
  }
  return data.csrfToken;
};

export const loginAccount = async (payload: LoginAccountPayload): Promise<void> => {
  const csrfToken = await getCsrfToken();
  const url = `${getBaseUrl()}/auth/login`;

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [CSRF_HEADER]: csrfToken,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 204) return;

  const message = await readErrorMessage(res);
  throw new ApiError(message, res.status);
};

/**
 * Register account against backend service.
 * Sends POST to /users
 */
export const registerUser = async (payload: RegisterUserPayload): Promise<void> => {
  const csrfToken = await getCsrfToken();
  const url = `${getBaseUrl()}/users`;

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [CSRF_HEADER]: csrfToken,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 204) return;

  if (res.status === 409) throw new ApiError('El correo ya está registrado', 409);
  if (res.status === 400) throw new ApiError('Datos inválidos, revisa el formulario', 400);
  throw new ApiError('No se pudo completar el registro', res.status);
};

/**
 * Backward-compatible wrapper used by current register flow.
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
  const normalizedGender: 'MALE' | 'FEMALE' =
    String(data.gender).toUpperCase() === 'FEMALE' ? 'FEMALE' : 'MALE';

  await registerUser({
    name: data.name,
    age: data.age ?? 0,
    gender: normalizedGender,
    email: data.email,
    phoneNo: data.phoneNo,
    zipCode: data.zipCode,
    macAddress: data.macAddress ?? getOrCreateDeviceMac(),
    pwd: data.pwd,
  });

  return { success: true };
};

export const getOrCreateDeviceMac = (): string => {
  try {
    const key = 'publi_connect_device_mac';
    const existing = localStorage.getItem(key);
    if (existing && existing.length) return existing;
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    const mac = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join(':');
    localStorage.setItem(key, mac);
    return mac;
  } catch {
    return '00:00:00:00:00:00';
  }
};
