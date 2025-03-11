// src/web/public/script.js
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

socket.on("gameCreated", (players) => {
  const playersDiv = document.getElementById("players");
  playersDiv.innerHTML = ""; // Clear previous content
  players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player";
    playerDiv.innerHTML = `<h2>${player.name}</h2>`;
    player.hand.forEach((row) => {
      const rowDiv = document.createElement("div");
      row.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerHTML = card ? card.value : "";
        rowDiv.appendChild(cardDiv);
      });
      playerDiv.appendChild(rowDiv);
    });
    playersDiv.appendChild(playerDiv);
  });
});

// Example: Join a game
socket.emit("joinGame", "game-id-123");

// Example: Make a move
socket.emit("makeMove", {
  gameId: "game-id-123",
  playerId: "player-id-123",
  action: "drawCard",
});
