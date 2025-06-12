import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://werwolf-production-938d.up.railway.app", {
  transports: ["websocket"]
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [inLobby, setInLobby] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("lobbyUpdate", (data) => {
      setPlayers(data.players);
    });
  }, []);

  const joinLobby = () => {
    if (username && room) {
      socket.emit("joinLobby", { username, room });
      setInLobby(true);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>🐺 Werwölfe Lobby</h1>

      {!inLobby ? (
        <>
          <input
            placeholder="Spielername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginRight: "1rem" }}
          />
          <input
            placeholder="Spielcode (z. B. ABCD)"
            value={room}
            onChange={(e) => setRoom(e.target.value.toUpperCase())}
          />
          <br /><br />
          <button onClick={joinLobby}>🎮 Lobby betreten</button>
        </>
      ) : (
        <>
          <h2>🧑‍🤝‍🧑 Spieler in Lobby {room}:</h2>
          <ul>
            {players.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;