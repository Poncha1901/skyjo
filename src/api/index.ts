// src/api/index.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Skyjo } from "../core/skyjo";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Allow requests from the web client
    methods: ["GET", "POST"],
  },
});

// const games: Map<string, SkyjoGame> = new Map();
const players: string[] = [];
io.on("connection", (socket) => {
  console.log("a user connected");

  players.push(socket.id);
  console.log(`Player ${socket.id} added to the list`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  //   socket.on('makeMove', (move: Move) => {
  //     const game = games.get(move.gameId);
  //     if (game) {
  //       game.makeMove(move);
  //       io.to(move.gameId).emit('gameUpdate', game.getGameState());
  //     }
  //   });

  socket.on("createGame", () => {
    const game = new Skyjo(players);
    socket.emit("gameCreated", game.players);
  });
});

server.listen(3000, () => {
  console.log("API server listening on *:3000");
});
