import { useState } from 'react';
import { Smartphone, Mail, Lock, Loader2, Apple } from 'lucide-react';
import { Button, Input, SocialButton } from '@/components/ui';
import { formatPhoneNumber, getRawPhone, isValidEmail } from '@/utils';
import type { AuthMode } from '@/types/auth';

export interface LoginFormProps {
  setAuthMode: (m: AuthMode) => void;
}

type LoginMethod = 'phone' | 'email';

interface LoginState {
  method: LoginMethod;
  phone: string;
  email: string;
  password: string;
  errors: Record<string, string>;
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setAuthMode }) => {
  const [state, setState] = useState<LoginState>({
    method: 'phone',
    phone: '',
    email: '',
    password: '',
    errors: {},
    loading: false
  });

  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    if (name === 'phone') {
      const raw = getRawPhone(value);
      if (value && raw.length < 10) errorMsg = 'Incompleto';
    }
    if (name === 'email') {
      if (value && !isValidEmail(value)) errorMsg = 'Inválido';
    }
    if (name === 'password') {
      if (value && value.length < 6) errorMsg = 'Mínimo 6 caracteres';
    }
    setState((prev) => ({ ...prev, errors: { ...prev.errors, [name]: errorMsg } }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.password.length < 6) {
      setState((prev) => ({ ...prev, errors: { ...prev.errors, password: 'Mínimo 6 caracteres' } }));
      return;
    }
    setState((prev) => ({ ...prev, loading: true }));
    setTimeout(() => setState((prev) => ({ ...prev, loading: false })), 2000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = getRawPhone(e.target.value);
    if (raw.length <= 10) {
      const formatted = formatPhoneNumber(raw);
      setState((prev) => ({ ...prev, phone: formatted }));
      validateField('phone', formatted);
    }
  };

  const isButtonDisabled =
    state.loading ||
    !!state.errors.phone ||
    !!state.errors.email ||
    !!state.errors.password ||
    !state.password ||
    state.password.length < 6 ||
    (state.method === 'phone' && !state.phone) ||
    (state.method === 'email' && !state.email);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-0.5">
        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Bienvenido de nuevo
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Conéctate a Publi Connect</p>
      </div>

      <div className="p-0.5 bg-gray-100 dark:bg-white/5 rounded-lg flex border border-gray-200 dark:border-white/5">
        <button
          onClick={() => setState((prev) => ({ ...prev, method: 'phone', errors: {} }))}
          className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${
            state.method === 'phone'
              ? 'bg-white dark:bg-white/10 shadow-sm text-black dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Celular
        </button>
        <button
          onClick={() => setState((prev) => ({ ...prev, method: 'email', errors: {} }))}
          className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${
            state.method === 'email'
              ? 'bg-white dark:bg-white/10 shadow-sm text-black dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Correo
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-2.5">
        {state.method === 'phone' ? (
          <Input
            icon={Smartphone}
            type="tel"
            placeholder="+52 55 1234 5678"
            label="Número de Celular"
            value={state.phone}
            onChange={handlePhoneChange}
            error={state.errors.phone}
            isValid={!state.errors.phone && state.phone.length > 0}
          />
        ) : (
          <Input
            icon={Mail}
            type="email"
            placeholder="usuario@ejemplo.com"
            label="Correo Electrónico"
            value={state.email}
            onChange={(e) => {
              setState((prev) => ({ ...prev, email: e.target.value }));
              validateField('email', e.target.value);
            }}
            error={state.errors.email}
            isValid={!state.errors.email && state.email.length > 0}
          />
        )}
        <Input
          type="password"
          placeholder="••••••••"
          label="Contraseña"
          icon={Lock}
          value={state.password}
          onChange={(e) => {
            setState((prev) => ({ ...prev, password: e.target.value }));
            validateField('password', e.target.value);
          }}
          error={state.errors.password}
          isValid={!state.errors.password && state.password.length >= 6}
        />

        <div className="flex justify-end">
          <button type="button" className="text-[10px] font-medium text-blue-600 hover:underline dark:text-blue-400">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button disabled={isButtonDisabled}>
          {state.loading ? <Loader2 className="animate-spin" /> : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-white/10"></span>
        </div>
        <div className="relative flex justify-center text-[9px] uppercase">
          <span className="bg-transparent dark:bg-transparent px-2 text-gray-500 backdrop-blur-xl">
            O continúa con
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <SocialButton icon={Apple} />
        <SocialButton icon={Apple} />
        <SocialButton icon={Apple} />
      </div>

      <p className="text-center text-[10px] text-gray-500 mt-2">
        ¿No tienes cuenta?{' '}
        <button onClick={() => setAuthMode('register')} className="text-blue-600 font-semibold hover:underline">
          Regístrate
        </button>
      </p>
    </div>
  );
};
