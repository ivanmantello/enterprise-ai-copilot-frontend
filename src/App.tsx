import { FileUpload, type Document } from "./components/FileUpload";
import { Chat } from "./components/Chat";
import "./App.css";
import { DocumentList } from "./components/DocumentList";
import { useEffect, useState } from "react";
import { fetchDocuments, deleteDocument } from "./services/api";
import { ResponseModeCard } from "./components/ResponseModeCard";

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [optimizedMode, setOptimizedMode] = useState(false);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const docsFromBackend = await fetchDocuments();

        const formattedDocs: Document[] = docsFromBackend.map((doc: any) => ({
          id: doc.document_id,
          name: doc.source_file,
          type: "application/pdf",
        }));

        setDocuments(formattedDocs);
        setSelectedDocs(formattedDocs.map((d) => d.id));
      } catch (error) {
        console.error("Error loading documents", error);
      }
    };

    loadDocuments();
  }, []);

  const handleNewDocument = (doc: Document) => {
    setDocuments((prev) => [...prev, doc]);
    setSelectedDocs((prev) => [...prev, doc.id]);
  };

  const handleToggleDoc = (docId: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const handleDelete = async (docId: string) => {
    try {
      await deleteDocument(docId);

      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      setSelectedDocs((prev) => prev.filter((id) => id !== docId));
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };

  return (
      <div className="app">
        <h1 className="title">Enterprise AI Knowledge Copilot</h1>

        
        <div className="doc-panels">
          <FileUpload onUpload={handleNewDocument} />

          <DocumentList
            documents={documents}
            selectedDocs={selectedDocs}
            onToggle={handleToggleDoc}
            onDelete={handleDelete}
          />

          <ResponseModeCard
            optimized={optimizedMode}
            onToggle={() => setOptimizedMode(prev => !prev)}
          />
        </div>

  
        <div className="app-content">
          <hr />

          <Chat
            selectedDocuments={documents.filter((d) =>
              selectedDocs.includes(d.id)
            )}
            optimizedMode={optimizedMode}
          />
        </div>
      </div>
    );
}

export default App;