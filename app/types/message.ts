export interface Message {
  type: "message" | "join" | "leave" | "identity";
  author: string;
  content: string;
  id?: string; // Optional for 'message' and 'identity'
}

// We could also use Discriminated Unions for more type safety:
/*
type IdentityMessage = {
    type: "identity";
    author: string;
    content: string;
    id: string;
}

type JoinLeaveMessage = {
    type: "join" | "leave";
    author: string;
    content: string;
    id: string;
};

type ChatMessage = {
    type: "message";
    author: string;
    content: string;
    id?: string; // Optional for 'message'
};

export type Message = IdentityMessage | JoinLeaveMessage | ChatMessage;
*/
