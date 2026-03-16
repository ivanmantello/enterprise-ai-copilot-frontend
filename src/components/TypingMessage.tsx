import { useEffect, useState } from "react";
import { Message } from "./Message";

interface Props {
  text: string;
  role: "assistant" | "user";
  speed?: number; // ms por letra

  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    estimated_cost_usd: number;
    latency_ms: number;
  };

  sources?: {
    file: string
    section: number
    chunk_id: string
    score: number
  }[]
}

export const TypingMessage = ({ text, role, speed = 30, usage, sources }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
      clearInterval(interval);
      setFinished(true);
    }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
     <Message
      role={role}
      content={displayedText}
      usage={finished ? usage : undefined}
      sources={finished ? sources : undefined}
    />
  );
};