import React, { useState, useEffect } from 'react';
import { formatPhoneNumber, getRawPhone, calculateAge, getValidationError, fetchCurpData } from '@/utils';
import { RegisterStep1 } from './RegisterStep1';
import { RegisterStep2 } from './RegisterStep2';
import { RegisterStep3 } from './RegisterStep3';
import type { AuthMode, CurpData, RegisterFormData, ModalData } from '@/types/auth';

export interface RegisterFormProps {
  setAuthMode: (m: AuthMode) => void;
  onShowConfirm: (data: ModalData) => void;
}

interface RegisterState {
  step: number;
  loading: boolean;
  curpInput: string;
  formData: RegisterFormData;
  errors: Record<string, string>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ setAuthMode, onShowConfirm }) => {
  const [state, setState] = useState<RegisterState>({
    step: 1,
    loading: false,
    curpInput: '',
    formData: {
      curpData: null,
      edadCalculada: null,
      codigoPostal: '',
      telefono: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: ''
    },
    errors: {}
  });

  useEffect(() => {
    globalThis.window.handleModalConfirm = (data: CurpData, age: number) => {
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, curpData: data, edadCalculada: age },
        step: 2
      }));
    };
    globalThis.window.handleModalCancel = () => {
      setState((prev) => ({ ...prev, curpInput: '' }));
    };
  }, []);

  const validateField = (field: string, value: string, confirmValue?: string) => {
    const error = getValidationError(field, value, confirmValue);
    setState((prev) => ({ ...prev, errors: { ...prev.errors, [field]: error } }));
  };

  const validateStep2 = () => {
    if (!state.formData.codigoPostal?.length || state.formData.codigoPostal.length !== 5) {
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, codigoPostal: 'Requerido' }
      }));
      return false;
    }
    return true;
  };  const validateStep3 = () => {
    const rawPhone = getRawPhone(state.formData.telefono);
    const phoneValid = rawPhone.length === 10;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.formData.correo);
    const passwordValid = state.formData.contrasena.length >= 6;
    const matchValid = state.formData.contrasena === state.formData.confirmarContrasena;

    const newErrors: Record<string, string> = {};
    if (!phoneValid) newErrors.telefono = 'Inválido';
    if (!emailValid) newErrors.correo = 'Inválido';
    if (!passwordValid) newErrors.contrasena = 'Muy corta';
    if (!matchValid) newErrors.confirmarContrasena = 'No coinciden';

    setState((prev) => ({ ...prev, errors: newErrors }));
    return phoneValid && emailValid && passwordValid && matchValid;
  };

  const triggerCurpSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.curpInput.length < 18) return;
    setState((prev) => ({ ...prev, loading: true }));
    const data = await fetchCurpData(state.curpInput);
    const age = calculateAge(data.fechaNacimiento);
    setState((prev) => ({ ...prev, loading: false }));
    onShowConfirm({ data, age });
  };

  const handlePersonalData = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) setState((prev) => ({ ...prev, step: 3 }));
  };

  const handleFinalRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setState((prev) => ({ ...prev, loading: true }));
      setTimeout(() => {
        setState((prev) => ({ ...prev, loading: false }));
        alert('¡Bienvenido a Publi Connect!');
        setAuthMode('login');
      }, 2000);
    }
  };

  const handleCPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replaceAll(/\D/g, '').slice(0, 5);
    setState((prev) => ({ ...prev, formData: { ...prev.formData, codigoPostal: val } }));
    validateField('codigoPostal', val);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = getRawPhone(e.target.value);
    if (raw.length <= 10) {
      const formatted = formatPhoneNumber(raw);
      setState((prev) => ({ ...prev, formData: { ...prev.formData, telefono: formatted } }));
      validateField('telefono', formatted);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setState((prev) => ({ ...prev, formData: { ...prev.formData, correo: val } }));
    validateField('correo', val);
  };

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={() => (state.step > 1 ? setState((prev) => ({ ...prev, step: prev.step - 1 })) : setAuthMode('login'))}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-[10px] font-medium flex items-center gap-1"
        >
          ← Atrás
        </button>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${
                s <= state.step ? 'w-5 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'w-1.5 bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white drop-shadow-sm">
          {state.step === 1 ? 'Empecemos con tu ID' : state.step === 2 ? 'Verifica tus datos' : 'Crea tu acceso'}
        </h2>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
          {state.step === 1
            ? 'Ingresa tu CURP para validar tu identidad'
            : state.step === 2
              ? 'Confirma tu información personal'
              : 'Establece tu seguridad'}
        </p>
      </div>

      {state.step === 1 && (
        <RegisterStep1
          loading={state.loading}
          curpInput={state.curpInput}
          onCurpChange={(value) => setState((prev) => ({ ...prev, curpInput: value }))}
          onValidate={triggerCurpSearch}
        />
      )}

      {state.step === 2 && state.formData.curpData && (
        <RegisterStep2
          formData={state.formData}
          errors={state.errors}
          onCodigoPostalChange={handleCPChange}
          onSubmit={handlePersonalData}
        />
      )}

      {state.step === 3 && (
        <RegisterStep3
          formData={state.formData}
          errors={state.errors}
          loading={state.loading}
          onPhoneChange={handlePhoneChange}
          onEmailChange={handleEmailChange}
          onPasswordChange={(e) => {
            setState((prev) => ({ ...prev, formData: { ...prev.formData, contrasena: e.target.value } }));
            validateField('contrasena', e.target.value);
          }}
          onConfirmPasswordChange={(e) => {
            setState((prev) => ({ ...prev, formData: { ...prev.formData, confirmarContrasena: e.target.value } }));
            validateField('confirmarContrasena', e.target.value, state.formData.contrasena);
          }}
          onSubmit={handleFinalRegister}
        />
      )}
    </div>
  );
};
