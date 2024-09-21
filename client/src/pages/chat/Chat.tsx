import { FC, useState, useEffect } from "react";

import SideBar from "./components/side-bar/SideBar";
import Body from "./components/body/Body";
import MessageBlock from "./components/message/MessageBlock";

import { Socket } from "socket.io-client";

export interface IChat {
  socket: Socket;
}

const Chat: FC<IChat> = ({ socket }) => {
  const [messages, setMessages] = useState<
    {
      text: string;
      name: string;
      id: string;
      socketID: string;
    }[]
  >([]);

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    socket.on("response", (data) => {
      setMessages((state) => [...state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("responseTyping", (data) => {
      setStatus(data);

      setTimeout(() => setStatus(""), 2000);
    });
  }, []);

  return (
    <div className="chat">
      <SideBar socket={socket} />
      <main className="main">
        <Body messages={messages} status={status} socket={socket} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};

export default Chat;
