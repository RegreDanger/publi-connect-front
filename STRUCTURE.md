## 📁 Estructura de Carpetas - Publi Connect

La aplicación ha sido completamente refactorizada para mejorar escalabilidad, mantenibilidad y reutilización de código.

### 🏗️ Estructura General

```
src/
├── App.tsx                 # Componente raíz principal
├── main.tsx               # Punto de entrada
├── index.css              # Estilos globales CSS
├── assets/                # Imágenes, fuentes, etc.
│
├── types/
│   └── auth.ts           # Tipos e interfaces de autenticación
│
├── utils/
│   ├── formatters.ts     # Funciones de formateo (teléfono, etc.)
│   ├── validators.ts     # Funciones de validación (email, edad, etc.)
│   ├── api.ts            # Llamadas a API mock/real
│   └── index.ts          # Exports centralizados
│
├── styles/
│   ├── globals.ts        # Estilos globales (animaciones, liquid-glass)
│   └── index.ts          # Exports centralizados
│
├── components/
│   ├── ui/               # Componentes sin lógica reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── SocialButton.tsx
│   │   └── index.ts
│   │
│   ├── features/         # Componentes con lógica de negocio
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── RegisterStep1.tsx   # Validación de CURP
│   │   ├── RegisterStep2.tsx   # Confirmación de datos
│   │   ├── RegisterStep3.tsx   # Datos de acceso
│   │   └── index.ts
│   │
│   └── layout/           # Componentes de layout
│       ├── ThemeToggle.tsx
│       ├── BackgroundBlobs.tsx
│       ├── ConfirmDataModal.tsx
│       └── index.ts
│
└── hooks/                # Custom React hooks (listo para expansión)
```

### 🎯 Arquitectura

#### **Capas de la Aplicación**

1. **App.tsx** - Componente raíz
   - Maneja estado global (darkMode, authMode, modalData)
   - Orquesta componentes principales
   - Limpio y enfocado en composición

2. **Components (UI Layer)**
   - `ui/`: Componentes reutilizables sin lógica
   - `features/`: Componentes con lógica de negocio
   - `layout/`: Componentes estructurales

3. **Utils (Business Logic)**
   - `formatters.ts`: Transformación de datos
   - `validators.ts`: Validaciones de campos
   - `api.ts`: Integración con backend

4. **Types (Shared Types)**
   - `auth.ts`: Interfases TypeScript compartidas

5. **Styles (Global Styles)**
   - `globals.ts`: Inyección de CSS global

### ✅ Ventajas de esta Estructura

- **Separación de Responsabilidades**: Cada archivo tiene un propósito claro
- **Escalabilidad**: Fácil añadir nuevas funcionalidades sin afectar existentes
- **Reutilización**: Componentes modularizados pueden usarse en múltiples lugares
- **Testing**: Cada componente es testeable de forma independiente
- **Mantenimiento**: Código organizado y fácil de navegar
- **Type-Safe**: TypeScript en toda la aplicación

### 🔄 Flujo de Datos

```
App.tsx (Estado Global)
  ├─→ LoginForm (features)
  │    └─→ Input + Button (ui)
  │         └─→ validators.ts
  │
  └─→ RegisterForm (features)
       ├─→ RegisterStep1/2/3 (features)
       │    └─→ Input + Button (ui)
       │         └─→ formatters.ts, validators.ts
       │
       └─→ ConfirmDataModal (layout)
            └─→ Button (ui)
                 └─→ api.ts (fetchCurpData)
```

### 🚀 Expansión Futura

Para agregar nuevas funcionalidades:

1. **Nuevos tipos**: `src/types/newModule.ts`
2. **Nuevas utilidades**: `src/utils/newUtility.ts`
3. **Nuevos componentes**: `src/components/features/NewComponent.tsx`
4. **Custom hooks**: `src/hooks/useNewHook.ts`
5. **Nuevos contextos**: `src/context/NewContext.tsx`

### 📝 Convenciones

- **Componentes UI**: Sin lógica, solo props
- **Componentes Features**: Con estado y lógica de negocio
- **Utils**: Funciones puras sin efectos secundarios
- **Types**: Interfaces compartidas en un solo lugar
- **Exports**: Usar index.ts para centralizar exports

### 🔗 Imports Centralizados

Gracias a los `index.ts` en cada carpeta:

```tsx
// En lugar de:
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Usa:
import { Button, Input } from '@/components/ui';
```

---

**Última actualización**: Diciembre 4, 2024  
**Versión**: 2.0 - Refactorizado y escalable
