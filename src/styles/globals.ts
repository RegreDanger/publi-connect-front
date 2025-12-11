/**
 * Global Styles
 * Injected CSS for animations and effects
 */

export const injectGlobalStyles = () => {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    /* Efecto Liquid Glass mejorado */
    .liquid-glass {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    }
    .dark .liquid-glass {
      background: rgba(17, 24, 39, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
    }
  `;
  document.head.appendChild(styleSheet);
};
