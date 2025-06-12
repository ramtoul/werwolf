import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://DEIN-BACKEND.up.railway.app"); // <- Anpassen

function App() {
  useEffect(() => {
    socket.on("pong", () => console.log("Pong empfangen"));
    socket.emit("ping");
  }, []);

  return <div className="p-4 text-xl">🎭 Werwölfe-App läuft!</div>;
}

export default App;