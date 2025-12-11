/**
 * Validators
 * Utility functions for field validation
 */

import { getRawPhone } from './formatters';

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const calculateAge = (birthDateString: string): number => {
  const [day, month, year] = birthDateString.split('/').map(Number);
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
      return value && value.length < 5 ? 'Incompleto' : '';
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
