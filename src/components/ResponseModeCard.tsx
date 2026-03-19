import "./ResponseModeCard.css";

interface Props {
  optimized: boolean;
  onToggle: () => void;
}

export const ResponseModeCard = ({ optimized, onToggle }: Props) => {
  return (
    <div className="response-card">
      <h3>Optimized response</h3>

      <p className="description">
        Enable <span className="negrita">neighbor expansion</span> to get more document context.
        This can generate more complete responses.
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
          {optimized ? "Activated" : "Deactivated"}
        </span>
      </div>
    </div>
  );
};