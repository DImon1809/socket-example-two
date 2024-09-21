import { FC } from "react";

import { Routes, Route } from "react-router-dom";

import * as socketIO from "socket.io-client";

import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

const socket = socketIO.connect("http://localhost:5000");

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/chat" element={<Chat socket={socket} />} />
    </Routes>
  );
};

export default App;
