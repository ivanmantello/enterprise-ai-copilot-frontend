import "./Message.css"
import { useState } from "react";

interface Props {
  role: "user" | "assistant";
  content: string;

  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    estimated_cost_usd: number;
    latency_ms: number;
  };

  sources?: {
    file: string;
    section: number;
    chunk_id: string;
    score: number;
  }[];
}

export const Message = ({ role, content, usage, sources  }: Props) => {
   const [expanded, setExpanded] = useState(false);

  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>
        
        {content}

        {role === "assistant" && usage && (
          <div className="message-details-toggle">

            <button
              className="details-button"
              onClick={() => setExpanded(!expanded)}
            >
              Detalle
            </button>

            {expanded && (
              <div className="message-details">

                <p>Prompt tokens: {usage.prompt_tokens}</p>
                <p>Completion tokens: {usage.completion_tokens}</p>
                <p>Total tokens: {usage.total_tokens}</p>
                <p>Coste estimado: ${usage.estimated_cost_usd}</p>
                <p>Latencia LLM: {usage.latency_ms} ms</p>



                {sources && sources.length > 0 && (
                  <div className="message-sources">

                    <p className="sources-title">Fuentes utilizadas</p>

                    {sources.map((s, i) => (
                      <div key={i} className="source-item">

                        <p><strong>Fuente:</strong> {s.file}</p>
                        <p>Sección {s.section}</p>
                        <p>Chunk {s.chunk_id.slice(0,8)}...</p>
                        <p>Distance Score: {s.score?.toFixed(3)}</p>

                      </div>
                    ))}

                  </div>
                )}



              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};


