export interface ChatUser {
  id: number;
  firstName: string;
  lastName: string;
  rate: number;
  nbRates: number;
  type: "client" | "host";
  isEmailVerified: boolean;
  profile: string;
  isIdentityVerified?: boolean;
}

export interface ChatMessage {
  id: number;
  text: string;
  with: ChatUser;
  imSender: boolean;
  date: string;
}

export interface Conversation {
  id: number;
  with: ChatUser;
  lastMessage: ChatMessage;
}

export interface SendMessageRequest {
  text: string;
}
