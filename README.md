
# Enterprise AI Copilot — Frontend

Frontend interface for an AI-powered document analysis assistant built with **React + TypeScript**.
The application allows users to upload documents, ask questions, and receive answers generated through a **Retrieval-Augmented Generation (RAG)** pipeline.

This repository contains the **user interface layer** that interacts with the backend RAG system.

---

# Demo

Live demo:
https://enterprise-ai-copilot.vercel.app/

Example workflow:

1. Upload one or more documents
2. Ask a question about their contents
3. The system retrieves relevant chunks
4. An LLM generates an answer using the retrieved context
5. The UI exposes explainability details such as tokens, cost and sources

---

# Key Features

### Conversational AI Interface

* Chat-based UI for asking questions about uploaded documents
* Simulated typing for AI responses
* Clean conversational layout

### Document Management

* Upload documents directly from the browser
* List uploaded documents
* Select which documents should be used for retrieval
* Delete documents

### RAG Explainability

The interface exposes internal signals of the RAG pipeline:

* LLM token usage
* Estimated generation cost
* Model latency
* Retrieved document chunks
* Retrieval similarity scores

This allows users to understand **how the AI generated the response**.


### Retrieval Modes

The system supports two retrieval strategies when answering questions.

#### Standard Mode

The system retrieves the top-k most relevant chunks from the vector database and sends them to the LLM as context.

#### Optimized Mode

When "Optimized Answer Mode" is enabled in the UI, the backend activates:

expand_neighbors = true

This expands the retrieval window by including neighboring chunks around the most relevant ones.

Example:

If the most relevant chunk is:

Chunk 14

The system may also retrieve:

Chunk 13
Chunk 14
Chunk 15

This improves answer quality by preserving the surrounding context that may have been split during document chunking.

This technique helps reduce context fragmentation, a common issue in RAG systems.

---

# Tech Stack

Frontend:

* React
* TypeScript
* Vite

Backend:

* FastAPI
* Vector database
* LLM API

Deployment:

* Frontend deployed on Vercel
* Backend deployed on Railway

AI stack:

* Embedding models for semantic search
* Vector similarity retrieval
* Large Language Model for answer generation

---

# Project Structure


frontend
    │
    ├── src
    │   ├── components
    │   │   ├── Chat.tsx
    │   │   ├── DocumentSelector.tsx
    │   │   ├── TypingMessage.tsx
    │   │   └── Message.tsx
    │   │
    │   ├── services
    │   │   └── api.ts
    │   │ 
    │   ├── types
    │   │   └── api.ts    
    │   │
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── package.json
    └── vite.config.ts

/components contain the UI logic,
/services manage communication with the backend API.

---

# API Integration

The frontend communicates with the backend using REST endpoints.

Main endpoint:

POST /ask

Example request:

{
"question": "What is double burden of malnutrition?",
"document_ids": ["doc_123"],
"expand_neighbors": true
}

Example response:

{
"answer": "...",
"sources": [...],
"tokens": {...},
"latency_ms": 2100
}

Other endpoints:

POST /upload

Uploads a document, processes it into chunks, generates embeddings, and stores them in the vector database.


GET /documents

Returns the list of documents currently indexed in the system.


DELETE /documents/{document_id}

Removes a document and its associated chunks from the vector database.

---

# Environment Variables

Create a `.env` file in the project root and configure the backend API URL.

```
VITE_API_URL=https://your-backend-url
```

The backend is expected to expose the RAG API endpoints used by the frontend.


---

# Local Development

Clone the repository:

git clone https://github.com/ivanmantello/enterprise-ai-copilot-frontend.git

Install dependencies:

npm install

Run the development server:

npm run dev

---

# RAG Architecture (High-Level)

User Question
↓
Vector Search (top-k chunks)
↓
Optional Neighbor Expansion
↓
Context Assembly
↓
LLM Answer Generation
↓
Explainability Metadata

---

# Why This Project

This project demonstrates practical skills in:

* AI application development
* Retrieval-Augmented Generation systems
* Full-stack integration with LLM APIs
* Vector search architectures
* AI explainability and observability

The goal was to build a **transparent AI assistant**, exposing internal signals like token usage, retrieval scores, and document sources.

---

# Future Improvements

Potential next steps:

* Streaming responses from the LLM
* Highlighting retrieved text chunks
* RAG debugging panel
* Authentication and user document isolation
* Multi-document ranking visualization

---

# Author

Built as part of a portfolio project focused on applied AI systems and RAG architecture.


