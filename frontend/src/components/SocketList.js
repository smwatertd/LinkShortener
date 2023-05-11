import { useContext } from "react";

import { Context } from "../index";

import { Socket } from "./Socket";

const SocketList = () => {
  const { socketList, pagination } = useContext(Context);
  let index = pagination.firstItemIndex;

  return (
    <div>
      {
        socketList
          .sockets
          .map(socket => {
            index += 1;
            return <Socket key={socket.shortUrl} index={index} socket={socket}/>;
          })
      }
    </div>
  );
};

export { SocketList };
