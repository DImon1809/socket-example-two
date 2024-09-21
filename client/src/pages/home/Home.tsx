import { FC, MouseEvent, useState } from "react";

import { Socket } from "socket.io-client";

import { useNavigate } from "react-router-dom";

export interface IHome {
  socket: Socket;
}

const Home: FC<IHome> = ({ socket }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<string>("");

  const handleSubmite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    localStorage.setItem("user", user);

    socket.emit("newuser", {
      user,
      socketID: socket.id,
    });

    navigate("/chat");
  };

  return (
    <form>
      <h2>Вход в чат</h2>

      <label htmlFor="user"></label>
      <input
        type="text"
        id="user"
        value={user}
        onChange={(event) => setUser(event.target.value)}
      />

      <button onClick={handleSubmite}>Войти</button>
    </form>
  );
};

export default Home;
