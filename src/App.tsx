import { useState, useEffect } from 'react';

type RegistrationPhase = 'quick' | 'complete';

export default function PubliConnectPortal() {
  const [phase, setPhase] = useState<RegistrationPhase>('quick');
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const [quickData, setQuickData] = useState({
    nombre: '',
    correo: ''
  });
  
  const [completeData, setCompleteData] = useState({
    numero: '',
    edad: '',
    genero: '',
    codigoPostal: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleQuickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuickData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompleteData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Acceso rápido:', quickData);
    alert('¡Conectado! Tienes 5 minutos de WiFi gratis ');
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullData = { ...quickData, ...completeData };
    console.log('Registro completo:', fullData);
    alert('¡Registro completo! Disfruta WiFi ilimitado ');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentSlide === 0) {
      setCurrentSlide(1);
    }
    if (isRightSwipe && currentSlide === 1) {
      setCurrentSlide(0);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e9f2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", sans-serif'
    }}>
      <div className="portal-container" style={{
        display: 'flex',
        maxWidth: '1200px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
        position: 'relative'
      }}>
        <div 
          className="carousel-wrapper"
          style={{
            display: 'flex',
            width: '100%',
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.3s ease-out'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="form-section" style={{
            flex: '0 0 100%',
            minWidth: '100%',
            padding: '60px 50px',
            background: 'white'
          }}>
            <div style={{ 
              marginBottom: '40px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.8s ease-out 0.2s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '600',
                  color: 'white',
                  letterSpacing: '1px'
                }}>PC</div>
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '8px',
                letterSpacing: '-0.5px'
              }}>
                Publi-Connect
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#718096',
                fontWeight: '400',
                marginBottom: '24px'
              }}>
                Conéctate a nuestra red WiFi gratuita
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '30px',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '10px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setPhase('quick')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  background: phase === 'quick' ? 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)' : 'transparent',
                  color: phase === 'quick' ? 'white' : '#718096',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  transform: phase === 'quick' ? 'scale(1.05)' : 'scale(1)',
                  flex: '1',
                  minWidth: '140px'
                }}
              >
                Acceso Rápido (5 min)
              </button>
              <button
                onClick={() => setPhase('complete')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  background: phase === 'complete' ? 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)' : 'transparent',
                  color: phase === 'complete' ? 'white' : '#718096',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  transform: phase === 'complete' ? 'scale(1.05)' : 'scale(1)',
                  flex: '1',
                  minWidth: '140px'
                }}
              >
                Acceso Completo
              </button>
            </div>

            {phase === 'quick' ? (
              <div style={{ opacity: 1, animation: 'fadeInUp 0.5s ease-out' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '10px',
                  letterSpacing: '-0.3px'
                }}>
                  ¡Conéctate en 10 segundos! ⚡
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#718096',
                  marginBottom: '25px'
                }}>
                  Solo necesitamos tu nombre y correo para darte 5 minutos gratis
                </p>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px',
                    letterSpacing: '0.2px'
                  }}>
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={quickData.nombre}
                    onChange={handleQuickChange}
                    required
                    placeholder="Juan Pérez"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      transition: 'all 0.3s',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px',
                    letterSpacing: '0.2px'
                  }}>
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={quickData.correo}
                    onChange={handleQuickChange}
                    required
                    placeholder="tu@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      transition: 'all 0.3s',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  onClick={handleQuickSubmit}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                    border: 'none',
                    borderRadius: '0 20px 20px 0',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    letterSpacing: '0.3px',
                    boxShadow: '0 4px 12px rgba(66, 153, 225, 0.3)'
                  }}
                >
                  Conectarme Ahora (5 min gratis)
                </button>

                <div style={{
                  marginTop: '20px',
                  padding: '15px',
                  background: '#f0f9ff',
                  borderLeft: '4px solid #4299e1',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#2d3748'
                }}>
                   <strong>Tip:</strong> Completa tu perfil después para WiFi ilimitado todo el día
                </div>
              </div>
            ) : (
              <div style={{ opacity: 1, animation: 'fadeInUp 0.5s ease-out' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '10px'
                }}>
                  Acceso WiFi Ilimitado 
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#718096',
                  marginBottom: '25px'
                }}>
                  Completa tu perfil y disfruta internet todo el día
                </p>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px'
                  }}>
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={quickData.nombre}
                    onChange={handleQuickChange}
                    placeholder="Juan Pérez"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px'
                  }}>
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={quickData.correo}
                    onChange={handleQuickChange}
                    placeholder="tu@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px'
                  }}>
                    TELÉFONO
                  </label>
                  <input
                    type="tel"
                    name="numero"
                    value={completeData.numero}
                    onChange={handleCompleteChange}
                    placeholder="9931234567"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px'
                  }}>
                    EDAD
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={completeData.edad}
                    onChange={handleCompleteChange}
                    min="1"
                    max="120"
                    placeholder="25"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px'
                  }}>
                    GÉNERO
                  </label>
                  <select
                    name="genero"
                    value={completeData.genero}
                    onChange={handleCompleteChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4a5568',
                    marginBottom: '6px'
                  }}>
                    CÓDIGO POSTAL
                  </label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={completeData.codigoPostal}
                    onChange={handleCompleteChange}
                    maxLength={5}
                    placeholder="86000"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '0 20px 20px 0',
                      outline: 'none',
                      fontFamily: 'inherit',
                      color: '#2d3748',
                      background: '#fafbfc',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  onClick={handleCompleteSubmit}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    border: 'none',
                    borderRadius: '0 20px 20px 0',
                    cursor: 'pointer',
                    letterSpacing: '0.3px',
                    boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)'
                  }}
                >
                   Obtener WiFi Ilimitado
                </button>
              </div>
            )}
          </div>

          <div className="info-section" style={{
            flex: '0 0 100%',
            minWidth: '100%',
            background: 'linear-gradient(135deg, #d4e9f2 0%, #b8dae8 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              top: '-100px',
              right: '-100px',
              animation: 'float 6s ease-in-out infinite'
            }} />
            
            <div style={{ 
              textAlign: 'center', 
              zIndex: 1,
              maxWidth: '400px'
            }}>
              <div style={{
                fontSize: '72px',
                marginBottom: '24px',
                animation: 'bounce 2s ease-in-out infinite'
              }}>
                
              </div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '16px'
              }}>
                Bienvenido a Publi-Connect
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '30px'
              }}>
                Conéctate en segundos y navega gratis por 5 minutos
              </p>

              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '16px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  ¿Por qué registrarte?
                </h3>
                <div style={{ textAlign: 'left', fontSize: '14px', color: '#4a5568' }}>
                  <div style={{ marginBottom: '10px' }}> WiFi rápido y seguro</div>
                  <div style={{ marginBottom: '10px' }}> Sin límite de dispositivos</div>
                  <div style={{ marginBottom: '10px' }}> Conexión estable</div>
                  <div> Soporte 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-indicators" style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'none',
          gap: '8px',
          zIndex: 10
        }}>
          <div 
            onClick={() => setCurrentSlide(0)}
            style={{
              width: currentSlide === 0 ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentSlide === 0 ? '#4299e1' : '#cbd5e0',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
          <div 
            onClick={() => setCurrentSlide(1)}
            style={{
              width: currentSlide === 1 ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentSlide === 1 ? '#4299e1' : '#cbd5e0',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 968px) {
          .portal-container {
            max-height: 90vh !important;
          }
          
          .form-section {
            padding: 40px 30px !important;
          }
          
          .carousel-indicators {
            display: flex !important;
          }
        }

        @media (min-width: 969px) {
          .carousel-wrapper {
            flex-wrap: nowrap !important;
          }
          
          .form-section {
            flex: 1 !important;
            min-width: auto !important;
          }
          
          .info-section {
            flex: 0.8 !important;
            min-width: auto !important;
          }
        }

        @media (max-width: 480px) {
          .form-section {
            padding: 30px 20px !important;
          }
          
          h1 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}