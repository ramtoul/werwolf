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
  const [role, setRole] = useState("");
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("lobbyUpdate", (data) => {
      setPlayers(data.players);
    });

    socket.on("roleAssigned", (data) => {
      setRole(data.role);
    });
  }, []);

  const joinLobby = () => {
    if (username && room) {
      socket.emit("joinLobby", { username, room });
      setInLobby(true);
      setIsHost(true); // Der erste Spieler ist der Host
    }
  };

  const startGame = () => {
    socket.emit("startGame", { room });
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>🐺 Werwölfe Spiel</h1>

      {!inLobby ? (
        <>
          <input
            placeholder="Spielername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginRight: "1rem" }}
          />
          <input
            placeholder="Spielcode"
            value={room}
            onChange={(e) => setRoom(e.target.value.toUpperCase())}
          />
          <br /><br />
          <button onClick={joinLobby}>🎮 Lobby betreten</button>
        </>
      ) : role ? (
        <>
          <h2>🎭 Deine Rolle: <span style={{ color: "darkred" }}>{role}</span></h2>
        </>
      ) : (
        <>
          <h2>🧑‍🤝‍🧑 Spieler in Lobby {room}:</h2>
          <ul>{players.map((p, i) => <li key={i}>{p}</li>)}</ul>
          {isHost && <button onClick={startGame}>🚀 Spiel starten</button>}
        </>
      )}
    </div>
  );
}

export default App;