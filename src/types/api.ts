export interface UploadResponse {
  status: string;
  chunks_created: number;
  document_id: string;
  embedding_model: string;
}

export interface AskResponse {
  answer: string;
  sources: {
    chunk_id: string;
    score: number;
  }[];
  confidence: string;
  latency_ms: number;
}