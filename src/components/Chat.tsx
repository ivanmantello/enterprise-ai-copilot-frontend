import { useState, useRef, useEffect } from "react";
import { askQuestion } from "../services/api";
import { Message } from "./Message";
import "./Chat.css"
import { TypingMessage } from "./TypingMessage";
import type { Document } from "./FileUpload";

interface Props {
  selectedDocuments: Document[];
  optimizedMode: boolean;
}


export const Chat = ({ selectedDocuments, optimizedMode }: Props) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; 
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
     }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const initialMessage = {
      role: "assistant" as const,
      content: "¡Hola! Soy una IA independiente, carga o selecciona documentos y pregunta lo que quieras sobre ellos.",
    };
    setMessages([initialMessage]);
  }, []);

 const handleAsk = async () => {
      if (!question.trim()) return;

      const currentQuestion = question; 
      setQuestion(""); 

      const userMessage = { role: "user" as const, content: currentQuestion };
      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      try {
        const response = await askQuestion(
          currentQuestion,
          selectedDocuments.map((doc) => doc.id),
          optimizedMode
        );
        
        const assistantMessage = {
          role: "assistant" as const,
          content: response.answer,
          usage: response.tokens,
          sources: response.sources
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error consultando al backend." },
        ]);
      } finally {
        setLoading(false);
      }
    };

  // Auto resize con límite
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 180; 
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = newHeight + "px";
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [question]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) =>
          msg.role === "assistant" ? (
            <TypingMessage 
                key={index} 
                text={msg.content} 
                role={msg.role} 
                usage={msg.usage}
                sources={msg.sources}
                />
          ) : (
            <Message 
                key={index} 
                role={msg.role} 
                content={msg.content} 
                usage={msg.usage}
                sources={msg.sources}
                />
          )
        )}
      </div>

      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Haz una pregunta..."
          className="chat-input"
        />
          
        <button
          onClick={handleAsk}
          disabled={loading}
          className="send-button"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};