import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Socket } from "socket.io-client";

export interface IBody {
  messages: {
    text: string;
    name: string;
    id: string;
    socketID: string;
  }[];
  status: string;
  socket: Socket;
}

const Body: FC<IBody> = ({ messages, status, socket }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem("user");

    socket.emit("leaveChat", {
      id: socket.id,
    });

    navigate("/");
  };

  return (
    <>
      <header className="header">
        <button className="btn" onClick={handleLeave}>
          Покинуть чат
        </button>
      </header>
      <div className="container">
        {messages.map((_mess, index) => {
          if (_mess.name !== localStorage.getItem("user"))
            return (
              <div className="chats" key={index + 1}>
                <p>{_mess.name}</p>
                <div className="message-recipient">
                  <p>{_mess.text}</p>
                </div>
              </div>
            );

          if (_mess.name === localStorage.getItem("user"))
            return (
              <div className="chats" key={index + 1}>
                <p>Вы</p>
                <div className="message-sender">
                  <p>{_mess.text}</p>
                </div>
              </div>
            );
        })}
      </div>

      <div className="status">
        <p>{status}</p>
      </div>
    </>
  );
};

export default Body;
