const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading document");
  }

  return response.json();
};

export const askQuestion = async (
  question: string,
  documentIds?: string[],
  expandNeighbors?: boolean
) => {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      document_ids: documentIds,
      expand_neighbors: expandNeighbors,
    }),
  });

  if (!response.ok) {
    throw new Error("Error asking question");
  }

  return response.json();
};


export async function fetchDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`);
  return response.json();
}

export async function deleteDocument(documentId: string) {
  const response = await fetch(`${API_BASE_URL}/documents/${documentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting document");
  }

  return response.json();
}