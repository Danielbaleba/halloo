import { WebSocketServer } from "ws";

// Render attribue automatiquement un port dans process.env.PORT
const PORT = process.env.PORT || 8081;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("Nouveau client connecté");

  ws.on("message", (message) => {
    console.log("📩 Message reçu:", message.toString());

    // Réémettre à tous les clients SAUF l'expéditeur
    wss.clients.forEach((client) => {
      console.log(cleient);
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
  
 /* ws.on("message", (message) => {
    console.log("Reçu :", message.toString());

    // Réponse directe
   // ws.send(message);

    // Broadcast à tous les clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });*/

  ws.on("close", () => console.log("Client déconnecté"));
});

console.log(`WebSocket server running on port ${PORT}`);
