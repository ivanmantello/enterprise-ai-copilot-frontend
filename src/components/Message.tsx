import "./Message.css"


interface Props {
  role: "user" | "assistant";
  content: string;
}

export const Message = ({ role, content }: Props) => {
  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>
        {content}
      </div>
    </div>
  );
};


