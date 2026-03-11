import { useState } from "react";
import CakesCard   from "../components/CakesCard";
import CakesDetail from "../components/CakesDetail";
import { useCakes } from "../hooks/useCakes";

export default function Gallery() {
  const { Cakes, loading, error } = useCakes();
  const [selected, setSelected]     = useState(null);
  const [search, setSearch]         = useState("");

  const filtered = Cakes.filter(
    (f) =>
      f.nombre.toLowerCase().includes(search.toLowerCase()) ||
      f.nombreCientifico.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <div className="gallery-hero__deco" aria-hidden="true">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
        <p className="gallery-hero__eyebrow">Enciclopedia Botánica</p>
        <h1 className="gallery-hero__title">Flores del<br /><em>Mundo</em></h1>
        <p className="gallery-hero__subtitle">
          Descubre la historia, la ciencia y la belleza de cada pétalo.
        </p>
        <label className="gallery-search">
          <span className="gallery-search__icon">⌕</span>
          <input
            type="search"
            placeholder="Buscar por nombre o especie…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="gallery-search__input"
          />
        </label>
      </header>

      {loading && (
        <div className="gallery-state">
          <p style={{ color: "#8df391", fontFamily: "serif", fontSize: "1.2rem" }}>
            🌿 Cargando flores…
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="gallery-state">
          <p>⚠️ No se pudieron cargar los pasteles: {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="gallery-state">
          <p className="gallery-empty">No se encontró «{search}».</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <main className="gallery-grid">
          {filtered.map((Cakes) => (
            <CakesCard
              key={Cakes.id}
              nombre={Cakes.nombre}
              nombreCientifico={Cakes.nombreCientifico}
              descripcion={Cakes.descripcion}
              imagenUrl={Cakes.imagenUrl}
              onClick={() => setSelected(Cakes)}
            />
          ))}
        </main>
      )}

      {selected && (
        <CakesDetail Cakes={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}