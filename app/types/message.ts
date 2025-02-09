export interface Message {
  type: "message" | "join" | "leave";
  author: string;
  content: string;
  id?: string; // ID for join/leave messages
}
