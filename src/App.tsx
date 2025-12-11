/**
 * ============================================================================
 * APP - Main Application Component
 * ============================================================================
 * Refactored for scalability and maintainability
 */

import { useState, useEffect } from 'react';
import { LoginForm, RegisterForm } from '@/components/features';
import { ThemeToggle, BackgroundBlobs, ConfirmDataModal } from '@/components/layout';
import { injectGlobalStyles } from '@/styles';
import type { AuthMode, ModalData } from '@/types/auth';

// Inyectar estilos globales
injectGlobalStyles();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [modalData, setModalData] = useState<ModalData | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleShowConfirm = (data: ModalData) => {
    setModalData(data);
  };

  const handleConfirmModal = () => {
    if (modalData) {
      if (globalThis.window.handleModalConfirm) {
        globalThis.window.handleModalConfirm(modalData.data, modalData.age);
      }
      setModalData(null);
    }
  };

  const handleDiscardModal = () => {
    if (globalThis.window.handleModalCancel) {
      globalThis.window.handleModalCancel();
    }
    setModalData(null);
  };

  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-start py-6 px-4 transition-colors duration-500 relative overflow-hidden ${
        darkMode ? 'bg-gray-950' : 'bg-gray-100'
      }`}
    >
      {/* Background Blobs */}
      <BackgroundBlobs darkMode={darkMode} />

      {/* Theme Toggle Button */}
      <ThemeToggle darkMode={darkMode} onToggle={setDarkMode} />

      {/* Main Content Wrapper */}
      <div className="w-full max-w-sm flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex-none mb-4 w-full">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 w-full h-16 rounded-2xl shadow-xl shadow-blue-500/20 ring-4 ring-white/20 backdrop-blur-md flex items-center justify-center transform transition-transform hover:scale-105">
            <span className="text-white font-bold tracking-[0.2em] text-lg">LOGO</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className="liquid-glass rounded-2xl overflow-hidden w-full">
            <div className="p-5">
              {authMode === 'login' ? (
                <LoginForm setAuthMode={setAuthMode} />
              ) : (
                <RegisterForm setAuthMode={setAuthMode} onShowConfirm={handleShowConfirm} />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center flex-none">
            <p className="text-[9px] text-gray-500 dark:text-gray-500 font-bold tracking-[0.2em] opacity-60">
              POWERED BY PUBLI CONNECT NETWORKS
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ConfirmDataModal data={modalData} onConfirm={handleConfirmModal} onCancel={handleDiscardModal} />
    </div>
  );
}