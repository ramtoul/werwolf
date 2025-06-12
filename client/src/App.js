
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

function App() {
  useEffect(() => {
    socket.on("pong", () => console.log("Pong erhalten"));
    socket.emit("ping");
  }, []);
  return <div className="p-4">Werwölfe-App läuft!</div>;
}

export default App;
