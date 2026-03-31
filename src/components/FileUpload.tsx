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
      setMessage(`Processed document. Chunks: ${response.chunks_created}`);
       if (onUpload) onUpload(doc); 
    } catch (error: any) {
      setMessage("Error uploading document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Upload Document</h3>
      <label
        htmlFor="file-upload"
        style={{
          display: "inline-block",
          padding: "8px 16px",
          backgroundColor: "rgb(53, 141, 156)",
          color: "white",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "8px",
        }}
      >
        Select File
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
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