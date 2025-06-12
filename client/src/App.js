import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://werwolf-production-938d.up.railway.app");

function App() {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log("✅ Verbunden mit Socket:", socket.id);
      socket.emit("ping");
    });

    socket.on("pong", () => {
      setMessage("🎉 Verbindung erfolgreich! Werwölfe-Server antwortet.");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🐺 Werwölfe von Düsterwald</h1>
      <p>Status: {connected ? "✅ Verbunden" : "❌ Nicht verbunden"}</p>
      <p>{message}</p>
    </div>
  );
}

export default App;