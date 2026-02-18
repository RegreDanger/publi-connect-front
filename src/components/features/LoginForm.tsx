import { useState } from 'react';
import { Mail, Lock, Loader2, Apple } from 'lucide-react';
import { Button, Input, SocialButton } from '@/components/ui';
import { ApiError, isValidEmail, loginAccount } from '@/utils';
import type { AuthMode } from '@/types/auth';

export interface LoginFormProps {
  setAuthMode: (m: AuthMode) => void;
  onLoginSuccess: () => void;
}

interface LoginState {
  email: string;
  password: string;
  errors: Record<string, string>;
  loading: boolean;
  submitError: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setAuthMode, onLoginSuccess }) => {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    errors: {},
    loading: false,
    submitError: ''
  });

  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    if (name === 'email') {
      if (value && !isValidEmail(value)) errorMsg = 'Inválido';
    }
    if (name === 'password') {
      if (value && value.length < 6) errorMsg = 'Mínimo 6 caracteres';
    }
    setState((prev) => ({ ...prev, errors: { ...prev.errors, [name]: errorMsg } }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(state.email)) {
      setState((prev) => ({ ...prev, errors: { ...prev.errors, email: 'Inválido' } }));
      return;
    }
    if (state.password.length < 6) {
      setState((prev) => ({ ...prev, errors: { ...prev.errors, password: 'Mínimo 6 caracteres' } }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, submitError: '' }));
    try {
      await loginAccount({
        email: state.email.trim(),
        pwd: state.password,
      });
      setState((prev) => ({ ...prev, loading: false }));
      onLoginSuccess();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'No fue posible iniciar sesión';
      setState((prev) => ({ ...prev, loading: false, submitError: message }));
    }
  };

  const isButtonDisabled =
    state.loading ||
    !!state.errors.email ||
    !!state.errors.password ||
    !state.email ||
    !state.password ||
    state.password.length < 6;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-0.5">
        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Bienvenido de nuevo
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Inicia sesión con tu correo</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-2.5">
        <Input
          icon={Mail}
          type="email"
          placeholder="usuario@ejemplo.com"
          label="Correo Electrónico"
          value={state.email}
          onChange={(e) => {
            setState((prev) => ({ ...prev, email: e.target.value, submitError: '' }));
            validateField('email', e.target.value);
          }}
          error={state.errors.email}
          isValid={!state.errors.email && state.email.length > 0}
        />
        <Input
          type="password"
          placeholder="••••••••"
          label="Contraseña"
          icon={Lock}
          value={state.password}
          onChange={(e) => {
            setState((prev) => ({ ...prev, password: e.target.value, submitError: '' }));
            validateField('password', e.target.value);
          }}
          error={state.errors.password}
          isValid={!state.errors.password && state.password.length >= 6}
        />

        {state.submitError && (
          <p className="text-[10px] text-red-600 dark:text-red-400 text-center font-medium">
            {state.submitError}
          </p>
        )}

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
