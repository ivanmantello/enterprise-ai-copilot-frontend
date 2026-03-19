import "./DocumentList.css";
import type { Document } from "./FileUpload";
import Icon from "../assets/documento.png"
import { useState } from "react";

interface Props {
  documents: Document[];
  selectedDocs: string[];
  onToggle: (docId: string) => void;
  onDelete: (docId: string) => void;  
}

export const DocumentList = ({
  documents,
  selectedDocs,
  onToggle,
  onDelete,
}: Props) => {

const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="document-card">
      <h3 className="doc-title">Selected context files</h3>

      <div className="document-list">
        {documents.map((doc) => {
          const selected = selectedDocs.includes(doc.id);

          return (
            <div key={doc.id} className="document-row">
              <div
                className={`document-item ${selected ? "selected" : ""}`}
                onClick={() => onToggle(doc.id)}
              >
                <img
                  src={doc.previewUrl || Icon}
                  alt={doc.name}
                  className="doc-preview"
                />

                <span className="doc-name">{doc.name}</span>

                <div className="circle">{selected && "✔"}</div>
              </div>

              <div className="menu-container">
                <button
                  className="menu-button"
                  onClick={() =>
                    setOpenMenu(openMenu === doc.id ? null : doc.id)
                  }
                >
                  ⋯
                </button>

                {openMenu === doc.id && (
                  <div className="menu-dropdown">
                    <button
                      className="menu-item delete"
                      onClick={() => {
                        onDelete(doc.id);
                        setOpenMenu(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
                </div>


            </div>
          );
        })}
      </div>
    </div>
  );
};