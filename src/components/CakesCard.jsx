import { useState } from "react";

export default function CakesCard({ nombre, nombreCientifico, descripcion, imagenUrl, onClick }) {
  const [imgError, setImgError]   = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const fallback = "https://placehold.co/400x300/1b2a1b/a8c5a0?text=" + encodeURIComponent(nombre);

  return (
    <article
      className="cakes-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={`Ver detalle de ${nombre}`}
    >
      <div className="cakes-card__img-wrap">
        {!imgLoaded && (
          <div className="cakes-card__skeleton">
            <span className="cakes-card__skeleton-icon">🌸</span>
          </div>
        )}
        <img
          src={imgError ? fallback : imagenUrl}
          alt={`Foto de ${nombre}`}
          className={`cakes-card__img ${imgLoaded ? "cakes-card__img--visible" : ""}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          loading="lazy"
        />
        <div className="cakes-card__overlay">
          <span className="cakes-card__cta">Explorar →</span>
        </div>
      </div>

      <div className="cakes-card__body">
        <p className="cakes-card__scientific">{nombreCientifico}</p>
        <h2 className="cakes-card__nombre">{nombre}</h2>
        <p className="cakes-card__desc">{descripcion}</p>
      </div>
    </article>
  );
}