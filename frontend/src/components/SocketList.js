import { useContext } from "react";

import { Context } from "../index";

import { Socket } from "./Socket";

const SocketList = () => {
  const { socketList } = useContext(Context);

  return (
    <div>
      {
        socketList
          .socketList
          .slice(socketList.firstSocketIndex, socketList.lastSocketIndex)
          .map((socket, index) =>
            <Socket
              key={socket.shortUrl}
              index={socketList.firstSocketIndex + index + 1}
              socket={socket}
            />
          )
      }
    </div>
  );
};

export { SocketList };
