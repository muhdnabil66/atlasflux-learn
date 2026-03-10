export interface AIModel {
  id: string;
  name: string;
  provider: string;
}

export const premiumModels: AIModel[] = [
  { id: "openai/gpt-5.3-codex", name: "GPT‑5.3-codex", provider: "OpenAI" },
  {
    id: "anthropic/claude-4.6-opus",
    name: "Claude 4.6 Opus",
    provider: "Anthropic",
  },
  {
    id: "anthropic/claude-4.6-sonnet",
    name: "Claude 4.6 Sonnet",
    provider: "Anthropic",
  },
  { id: "google/gemini-3.1-pro", name: "Gemini 3.1 Pro", provider: "Google" },
  { id: "deepseek/deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek" },
];
