import { FC, MouseEvent, useState } from "react";

import { Socket } from "socket.io-client";

export interface IMessageBlock {
  socket: Socket;
}

const MessageBlock: FC<IMessageBlock> = ({ socket }) => {
  const [message, setMessage] = useState<string>("");

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("user")} is typing...`);
  };

  const handleSend = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("user"),
        id: `${socket.id}`,
        socketID: socket.id,
      });
    }

    setMessage("");
  };

  return (
    <div className="message-block">
      <form>
        <input
          type="text"
          className="user-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleTyping}
        />
        <button onClick={handleSend}>Сказать</button>
      </form>
    </div>
  );
};

export default MessageBlock;
