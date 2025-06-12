import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "/images/fes1.jpg",
    "/images/fes2.jpg",
    "/images/fes3.jpg",
    "/images/fes4.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAE7FB] to-[#C3C7F4]">
      {/* Hero Section with Carousel */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover transition-all duration-1000"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            opacity: 0.7,
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-[var(--theme-dark)] mb-4">
            Bienvenido a AlphaEduca
          </h1>
          <p className="text-xl text-[var(--theme-primary)] mb-8">
            Tu espacio para el aprendizaje y desarrollo académico
          </p>
          <div className="space-x-4">
            <Link 
              to="/courses" 
              className="bg-[var(--theme-primary)] hover:bg-[var(--theme-accent)] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ver Cursos
            </Link>
            <Link 
              to="/login" 
              className="bg-[var(--theme-highlight)] hover:bg-[var(--theme-accent)] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
  
      {/* Información de la Plataforma */}
      <section className="py-16 px-4 bg-[var(--theme-secondary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--theme-dark)]">
            Sobre la Plataforma
          </h2>
          <p className="text-[var(--theme-primary)] mb-4">
            AlphaEduca es un espacio digital diseñado para facilitar
            el proceso de enseñanza-aprendizaje en la FES Acatlán. Aquí encontrarás
            herramientas y recursos que te ayudarán en tu desarrollo académico.
          </p>
        </div>
      </section>
  
      {/* Información de MAC */}
      <section className="py-16 px-4 bg-[var(--theme-accent)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--theme-dark)]">
            Historia de la Licenciatura
          </h2>
          <p className="text-[var(--theme-primary)] mb-4">
            Licenciatura de Matemáticas Aplicadas y Computación. Su creación fue aprobada
            por el H. Consejo Universitario el 26 de agosto de 1982, iniciando al semestre
            inmediato sus actividades. 
            <a href="https://mac.acatlan.unam.mx/media/vinculos/2011/08/Triptico_Pima_1.pdf" target="_blank" className="text-[var(--theme-highlight)] underline">
              Leer más
            </a>
          </p>
        </div>
      </section>
  
      {/* Información de Contacto */}
      <footer className="bg-[var(--theme-highlight)] text-[var(--theme-dark)] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Contacto</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Dirección</h3>
              <p>Av. Jardines de San Mateo s/n</p>
              <p>Sta Cruz Acatlán 53150</p>
              <p>Naucalpan de Juárez, Méx.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Información de Contacto</h3>
              <p>Teléfono: 56-23-17-40 (41)</p>
              <p>Email: mac@acatlan.unam.mx</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Horario de Atención</h4>
                <p>Lunes a Viernes: 9:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );  
};

export default HomePage;