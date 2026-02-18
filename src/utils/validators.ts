/**
 * Validators
 * Utility functions for field validation
 */

import { getRawPhone } from './formatters';

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const calculateAge = (birthDateString: string): number => {
  let day: number;
  let month: number;
  let year: number;

  if (birthDateString.includes('/')) {
    [day, month, year] = birthDateString.split('/').map(Number);
  } else if (birthDateString.includes('-')) {
    [year, month, day] = birthDateString.split('-').map(Number);
  } else {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - year;
  const m = today.getMonth() + 1 - month;
  if (m < 0 || (m === 0 && today.getDate() < day)) {
    age--;
  }
  return age;
};

export const getValidationError = (
  field: string,
  value: string,
  confirmValue?: string
): string => {
  switch (field) {
    case 'codigoPostal':
      return value && !/^(0[1-9]\d{3}|[1-9]\d{4})$/.test(value) ? 'CP inválido' : '';
    case 'telefono': {
      const rawPhone = getRawPhone(value);
      return value && rawPhone.length < 10 ? 'Incompleto' : '';
    }
    case 'correo':
      return value && !isValidEmail(value) ? 'Inválido' : '';
    case 'contrasena':
      return value && value.length < 6 ? 'Mínimo 6' : '';
    case 'confirmarContrasena':
      return value && value !== confirmValue ? 'No coinciden' : '';
    default:
      return '';
  }
};
