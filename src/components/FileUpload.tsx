import { useState } from "react";
import { uploadDocument } from "../services/api";
import type { UploadResponse } from "../types/api";

interface Props {
  onUpload?: (doc: Document) => void; 
}

export const FileUpload = ({ onUpload }: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setLoading(true);
    setMessage("");

    try {
      const response: UploadResponse = await uploadDocument(file);
      const doc = {
        id: response.document_id,
        name: file.name,
        type: file.type,
        // previewUrl: response.previewUrl, 
      };
      setMessage(`Documento procesado. Chunks: ${response.chunks_created}`);
       if (onUpload) onUpload(doc); 
    } catch (error: any) {
      setMessage("Error subiendo documento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Upload Document</h3>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Processing...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};




export interface Document {
  id: string;
  name: string;
  type: string;
  previewUrl?: string;
}