import "./ResponseModeCard.css";

interface Props {
  optimized: boolean;
  onToggle: () => void;
}

export const ResponseModeCard = ({ optimized, onToggle }: Props) => {
  return (
    <div className="response-card">
      <h3>Respuesta optimizada</h3>

      <p className="description">
        Activa <span className="negrita">expansión de vecinos</span> para obtener mayor contexto del documento.
        Puede generar respuestas más completas.
      </p>

      <div className="toggle-row">
        <label className="switch">
          <input
            type="checkbox"
            checked={optimized}
            onChange={onToggle}
          />
          <span className="slider"></span>
        </label>

        <span className={`toggle-status ${optimized ? "on" : "off"}`}>
          {optimized ? "Activado" : "Desactivado"}
        </span>
      </div>
    </div>
  );
};