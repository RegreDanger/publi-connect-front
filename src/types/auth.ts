/**
 * Auth Types and Interfaces
 * Centralized type definitions for authentication system
 */

export type AuthMode = 'login' | 'register';
export type LoginMethod = 'phone' | 'email';

export interface CurpData {
  curp: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  fechaNacimiento: string; // Formato: DD/MM/YYYY
  estado: string;
}

export interface RegisterFormData {
  curpData: CurpData | null;
  edadCalculada: number | null;
  codigoPostal: string;
  telefono: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
}

export interface LoginFormState {
  phone: string;
  email: string;
  password: string;
  errors: Record<string, string>;
  loading: boolean;
}

export interface RegisterFormState {
  step: number;
  loading: boolean;
  curpInput: string;
  formData: RegisterFormData;
  errors: Record<string, string>;
}

export interface ModalData {
  data: CurpData;
  age: number;
}

// Global window type extension for modal callbacks
declare global {
  interface Window {
    handleModalConfirm?: (data: CurpData, age: number) => void;
    handleModalCancel?: () => void;
  }
}
