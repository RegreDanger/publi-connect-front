# 📖 Ejemplos de Uso - Publi Connect Refactorizada

## Importar Componentes

### UI Components
```tsx
import { Button, Input, SocialButton } from '@/components/ui';

<Button variant="primary" icon={Send}>Enviar</Button>
<Input label="Email" type="email" icon={Mail} />
<SocialButton icon={Apple} />
```

### Feature Components
```tsx
import { LoginForm, RegisterForm } from '@/components/features';

{authMode === 'login' ? 
  <LoginForm setAuthMode={setAuthMode} /> :
  <RegisterForm setAuthMode={setAuthMode} onShowConfirm={handleConfirm} />
}
```

### Layout Components
```tsx
import { ThemeToggle, BackgroundBlobs, ConfirmDataModal } from '@/components/layout';

<ThemeToggle darkMode={darkMode} onToggle={setDarkMode} />
<BackgroundBlobs darkMode={darkMode} />
<ConfirmDataModal data={modalData} onConfirm={onConfirm} onCancel={onCancel} />
```

---

## Usar Utilidades

### Formatters
```tsx
import { formatPhoneNumber, getRawPhone } from '@/utils';

const raw = getRawPhone('+52 55 1234 5678');  // '5512345678'
const formatted = formatPhoneNumber('5512345678');  // '+52 55 1234 5678'
```

### Validators
```tsx
import { isValidEmail, calculateAge, getValidationError } from '@/utils';

const email = 'user@example.com';
const valid = isValidEmail(email);  // true

const birthDate = '15/08/1995';
const age = calculateAge(birthDate);  // 29

const error = getValidationError('correo', 'invalid-email');  // 'Inválido'
```

### API
```tsx
import { fetchCurpData, loginUser, registerUser } from '@/utils';

const curpData = await fetchCurpData('JIMM950815HDFRRN09');
const loginResult = await loginUser('phone', '5512345678', 'password123');
const registerResult = await registerUser({
  telefono: '+52 55 1234 5678',
  correo: 'user@example.com',
  contrasena: 'password123',
  codigoPostal: '28001'
});
```

---

## Tipos e Interfaces

```tsx
import type {
  AuthMode,
  LoginMethod,
  CurpData,
  RegisterFormData,
  LoginFormState,
  RegisterFormState,
  ModalData
} from '@/types/auth';

const authMode: AuthMode = 'login';  // 'login' | 'register'
const loginMethod: LoginMethod = 'email';  // 'email' | 'phone'

const curpData: CurpData = {
  curp: 'JIMM950815HDFRRN09',
  nombres: 'JUAN',
  apellidoPaterno: 'MARTINEZ',
  apellidoMaterno: 'MORALES',
  genero: 'HOMBRE',
  fechaNacimiento: '15/08/1995',
  estado: 'CDMX'
};
```

---

## Crear un Nuevo Componente UI

### 1. Crear el archivo

`src/components/ui/Checkbox.tsx`:

```tsx
import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  ...props
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
        {...props}
      />
      {label && <label className="cursor-pointer text-sm">{label}</label>}
    </div>
  );
};
```

### 2. Exportar en index.ts

`src/components/ui/index.ts`:

```tsx
export { Checkbox, type CheckboxProps } from './Checkbox';
```

### 3. Usar en el proyecto

```tsx
import { Checkbox } from '@/components/ui';

<Checkbox 
  label="Aceptar términos" 
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

---

## Crear una Nueva Validación

### 1. Agregar función

`src/utils/validators.ts`:

```tsx
export const isValidCURP = (curp: string): boolean => {
  const curpRegex = /^[A-ZÑ]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
  return curpRegex.test(curp);
};

export const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};
```

### 2. Exportar en index.ts

`src/utils/index.ts`:

```tsx
export { isValidCURP, isStrongPassword } from './validators';
```

### 3. Usar en componentes

```tsx
import { isValidCURP, isStrongPassword } from '@/utils';

if (!isValidCURP(curpInput)) {
  setError('CURP inválido');
}

if (!isStrongPassword(password)) {
  setError('Contraseña débil');
}
```

---

## Crear un Custom Hook

### 1. Crear el hook

`src/hooks/useFormValidation.ts`:

```tsx
import { useState, useCallback } from 'react';
import { getValidationError } from '@/utils';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((field: string, value: string, confirmValue?: string) => {
    const error = getValidationError(field, value, confirmValue);
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isValid = Object.values(errors).every((error) => !error);

  return { errors, validateField, clearErrors, isValid };
};
```

### 2. Usar en componentes

```tsx
import { useFormValidation } from '@/hooks/useFormValidation';

export const MyForm = () => {
  const { errors, validateField, isValid } = useFormValidation();
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateField('email', e.target.value);
  };

  return (
    <>
      <Input 
        value={email}
        onChange={handleChange}
        error={errors.email}
      />
      <Button disabled={!isValid}>Enviar</Button>
    </>
  );
};
```

---

## Reemplazar Mock API con Real

### Antes (Mock)

`src/utils/api.ts`:

```tsx
export const fetchCurpData = async (curp: string): Promise<CurpData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ curp, nombres: 'MOCK', ... });
    }, 1500);
  });
};
```

### Después (Real)

```tsx
export const fetchCurpData = async (curp: string): Promise<CurpData> => {
  const response = await fetch(`/api/curp/${curp}`);
  if (!response.ok) throw new Error('CURP no encontrado');
  return response.json();
};

export const loginUser = async (
  method: 'phone' | 'email',
  value: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [method]: value, password })
  });
  return response.json();
};
```

---

## Estructura Completa de un Componente Feature

```tsx
import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { formatPhoneNumber, isValidEmail } from '@/utils';
import type { AuthMode } from '@/types/auth';

export interface MyFormProps {
  onSubmit: (data: MyFormData) => void;
  setAuthMode: (m: AuthMode) => void;
}

interface MyFormData {
  email: string;
  phone: string;
}

export const MyForm: React.FC<MyFormProps> = ({ onSubmit, setAuthMode }) => {
  const [state, setState] = useState<MyFormData>({
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      onSubmit(state);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
        error={errors.email}
      />
      <Input
        label="Teléfono"
        type="tel"
        value={state.phone}
        onChange={(e) => setState({ ...state, phone: formatPhoneNumber(e.target.value) })}
        error={errors.phone}
      />
      <Button disabled={loading}>
        {loading ? 'Cargando...' : 'Enviar'}
      </Button>
    </form>
  );
};
```

---

## ¡Listo! 🎉

Ahora tienes:
- ✅ Componentes reutilizables
- ✅ Lógica separada de presentación
- ✅ Tipos compartidos
- ✅ Utilidades testables
- ✅ Estructura escalable

**¡Felicidades por tu nueva arquitectura!** 🚀
