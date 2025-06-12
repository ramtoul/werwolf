
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  useEffect(() => {
    socket.on("pong", () => console.log("Pong erhalten"));
    socket.emit("ping");
  }, []);
  return <div className="p-4">Werwölfe-App läuft!</div>;
}

export default App;
