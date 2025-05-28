import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { sendOSCMessage } from "./oscSetup.js";

dotenv.config();

const webSocketPort = process.env.WEBSOCKET_PORT || 8080;

const wss = new WebSocketServer({ port: webSocketPort });

console.log(`WebSocket server is running on ws://localhost:${webSocketPort}`);

wss.on("connection", function connection(ws) {
  console.log("New client connected");
  console.log("Client size: ", wss.clients.size);
  if (wss.clients.size === 1) {
    console.log("Starting keep alive");
    startKeepAlive();
  }

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    try {
      const message = JSON.parse(data);
      for (const [key, value] of Object.entries(message)) {
        console.log(`Sending OSC message: ${key} -> ${value}`);
        // Replace the following line with your OSC sending logic
        sendOSCMessage(key, value);
      }
    } catch (error) {
      console.error("Failed to parse JSON message:", error);
    }
    broadcast(ws, data, false);
    console.log(`Received message: ${data}`);
  });
//   ws.send("Alles verbonden"); VOOR TOUCHDESIGNER 
});

const broadcast = (ws, message, includeSelf) => {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};

const startKeepAlive = () => {
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send("ping");
      }
    });
  }, 50000); // Send a ping every 30 seconds
};
