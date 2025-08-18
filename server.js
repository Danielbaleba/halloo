import { WebSocketServer } from "ws";

// Render attribue automatiquement un port dans process.env.PORT
const PORT = process.env.PORT || 8081;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("Nouveau client connecté");

  ws.on("message", (message) => {
    console.log("Reçu :", message.toString());

    // Réponse directe
    ws.send(`Echo: ${message}`);

    // Broadcast à tous les clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    });
  });

  ws.on("close", () => console.log("Client déconnecté"));
});

console.log(`WebSocket server running on port ${PORT}`);
