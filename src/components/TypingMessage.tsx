import { useEffect, useState } from "react";

interface Props {
  text: string;
  role: "assistant" | "user";
  speed?: number; // ms por letra
}

export const TypingMessage = ({ text, role, speed = 30 }: Props) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>{displayedText}</div>
    </div>
  );
};