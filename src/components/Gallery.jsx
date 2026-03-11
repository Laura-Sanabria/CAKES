import React, { useState, useEffect } from 'react';
import { getCakes } from '../services/cakesServices';

const Gallery = () => {
  const [pasteles, setPasteles] = useState([]);

  // Cargamos los datos desde el servicio al iniciar
  useEffect(() => {
    const fetchCakes = async () => {
      const data = await getCakes();
      // Inicializamos cada pastel con 0 likes si no los traen
      const dataWithLikes = data.map(p => ({ ...p, likes: p.likes || 0 }));
      setPasteles(dataWithLikes);
    };
    fetchCakes();
  }, []);

  const darLike = (id) => {
    setPasteles(pasteles.map(pastel => 
      pastel.id === id ? { ...pastel, likes: pastel.likes + 1 } : pastel
    ));
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '25px', 
      padding: '40px' 
    }}>
      {pasteles.map((pastel) => (
        <div key={pastel.id} style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '20px', 
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {/* Imagen del Pastel */}
          <img 
            src={pastel.image} 
            alt={pastel.name} 
            style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '15px' }} 
          />
          
          <h3 style={{ margin: '10px 0 5px', color: '#f084ba' }}>{pastel.name}</h3>
          <p style={{ fontSize: '0.85rem', color: '#333', marginBottom: '10px' }}>
            {pastel.description}
          </p>
          
          {/* Reproductor de Video */}
          <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#000' }}>
            <video controls style={{ width: '100%', display: 'block' }}>
              <source src={pastel.video} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
            {/* Botón Me Gusta */}
            <button 
              onClick={() => darLike(pastel.id)}
              style={{ 
                background: '#ffdae9', border: 'none', padding: '8px 15px',
                borderRadius: '20px', cursor: 'pointer', color: '#d63384', fontWeight: 'bold'
              }}
            >
              ❤️ {pastel.likes}
            </button>

            {/* Enlace al PDF (Receta) */}
            <a 
              href={pastel.pdf} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                textDecoration: 'none', color: '#8942db', fontWeight: 'bold', 
                fontSize: '0.85rem', border: '1px solid #c8a6ff', 
                padding: '7px 12px', borderRadius: '10px'
              }}
            >
              📄 Receta PDF
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;