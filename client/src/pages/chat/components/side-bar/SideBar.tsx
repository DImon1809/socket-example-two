import { FC, useState, useEffect } from "react";

import { Socket } from "socket.io-client";

export interface ISideBar {
  socket: Socket;
}

const SideBar: FC<ISideBar> = ({ socket }) => {
  const [users, setUsers] = useState<
    {
      user: string;
      socketID: string;
    }[]
  >([]);

  useEffect(() => {
    socket.on(
      "responseNewUser",
      (
        data: {
          user: string;
          socketID: string;
        }[]
      ) => {
        console.log("Users", data);

        setUsers(data);
      }
    );

    return () => {
      socket.off("responseNewUser");
    };
  }, [socket]);

  return (
    <div className="sidebar">
      <h4 className="header">Users:</h4>
      <ul className="users">
        {users.map((user) => (
          <li key={user.socketID}>{user.user}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
