export function GET() {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}

export function SOCKET(
  client: import("ws").WebSocket & { id?: string }, // Extend WebSocket type
  _request: import("node:http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  // Generate a unique ID for this client
  client.id = Math.random().toString(36).substring(2, 15);

  // Notify other clients about the new joiner (including the new client)
  for (const other of server.clients) {
    if (other.readyState === other.OPEN) {
      other.send(
        JSON.stringify({
          type: "join",
          id: client.id,
          author: "System",
          content: `User ${client.id} joined the chat`,
        })
      );
    }
  }

  // Send a welcome message AND the ID to the new client
  client.send(
    JSON.stringify({
      type: "identity", // Changed message type to 'identity'
      id: client.id,     // Include the ID
      author: "System",
      content: `Welcome to the chat! There ${
        server.clients.size - 1 === 1
          ? "is 1 other user"
          : `are ${server.clients.size - 1 || "no"} other users`
      } online`,
    })
  );

  client.on("message", (message) => {
    // Forward the message to all other clients
    for (const other of server.clients) {
      if (client !== other && other.readyState === other.OPEN) {
        other.send(message);
      }
    }
  });

  client.on("close", () => {
    // Notify other clients about the leaver (including ID)
    for (const other of server.clients) {
      if (other !== client && other.readyState === other.OPEN) {
        other.send(
          JSON.stringify({
            type: "leave",
            id: client.id,
            author: "System",
            content: `User ${client.id} left the chat`,
          })
        );
      }
    }
  });
}

