export interface UploadResponse {
  status: string;
  chunks_created: number;
  document_id: string;
  embedding_model: string;
}

export interface AskResponse {
  answer: string;

  sources: {
    file: string
    section: number
    chunk_id: string;
    score: number;
  }[];
  
  confidence: string;
  
  latency_ms: number;

  tokens: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    estimated_cost_usd: number;
    latency_ms: number;
  };
}