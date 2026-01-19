/**
 * Demo Dashboard Styles
 * Liquid glass effect with SVG filter
 */

export const injectDemoStyles = () => {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    :root {
      --lg-bg-color: rgba(59, 130, 246, 0.15);
      --lg-highlight: rgba(255, 255, 255, 0.4);
      --lg-text: #ffffff;
      --lg-blue: #3b82f6;
      --lg-blue-light: #60a5fa;
      --lg-grey: #e5e7eb;
    }

    .dark {
      --lg-bg-color: rgba(17, 24, 39, 0.4);
      --lg-highlight: rgba(255, 255, 255, 0.2);
    }

    /* Liquid Glass Container Real */
    .liquid-glass-demo {
      position: relative;
      display: flex;
      align-items: center;
      background: transparent;
      border-radius: 2rem;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.1);
      color: var(--lg-text);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
    }

    /* Capas del Glass Effect */
    .glass-filter,
    .glass-overlay,
    .glass-specular {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
    }

    .glass-filter {
      z-index: 0;
      backdrop-filter: blur(16px) saturate(120%);
      -webkit-backdrop-filter: blur(16px) saturate(120%);
      filter: url(#lensFilter) saturate(120%) brightness(1.15);
    }

    .glass-overlay {
      z-index: 1;
      background: var(--lg-bg-color);
    }

    .glass-specular {
      z-index: 2;
      box-shadow: 
        inset 1px 1px 0 var(--lg-highlight),
        inset 0 0 8px var(--lg-highlight);
    }

    .glass-content {
      position: relative;
      z-index: 3;
      width: 100%;
    }

    /* Card Hover Effect - Apple Style */
    .card-apple-hover {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-apple-hover:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(59, 130, 246, 0.35);
    }

    .dark .card-apple-hover:hover {
      box-shadow: 0 20px 60px rgba(59, 130, 246, 0.45);
    }

    /* Smooth Fade In */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
    }

    /* Stagger animation delays */
    .animate-delay-100 { animation-delay: 0.1s; }
    .animate-delay-200 { animation-delay: 0.2s; }
    .animate-delay-300 { animation-delay: 0.3s; }
    .animate-delay-400 { animation-delay: 0.4s; }

    /* Video container glass */
    .video-glass-container {
      position: relative;
      background: transparent;
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .video-glass-container .glass-filter {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .video-glass-container .glass-overlay {
      background: rgba(0, 0, 0, 0.6);
    }

    /* Smooth transitions for all interactive elements */
    .transition-smooth {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Icon glow effect */
    .icon-glow {
      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
    }

    /* Text shadow for better readability */
    .text-glass {
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(styleSheet);
};

export const createSVGFilter = () => {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.style.display = "none";
  svg.innerHTML = `
    <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feComponentTransfer in="SourceAlpha" result="alpha">
        <feFuncA type="identity" />
      </feComponentTransfer>
      <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />
      <feDisplacementMap in="SourceGraphic" in2="blur" scale="50" xChannelSelector="A" yChannelSelector="A" />
    </filter>
    
    <filter id="displacementFilter">
      <feImage href="data:image/png;base64,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" 
        preserveAspectRatio="none" />
      <feDisplacementMap 
        in="SourceGraphic"
        in2="turbulence"    
        scale="200" 
        xChannelSelector="R" 
        yChannelSelector="G" 
      />
    </filter>
  `;
  document.body.appendChild(svg);
};
