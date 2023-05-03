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
          .map(socket => <Socket key={socket.shortUrl} index={socket.index} socket={socket}/>)
      }
    </div>
  );
};

export { SocketList };
