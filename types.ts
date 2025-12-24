export enum Sender {
  User = 'user',
  Gemini = 'gemini',
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}