import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";

import { Socket } from "./Socket";

const SocketList = observer(() => {
  const { socketList, pagination } = useContext(Context);
  let num = pagination.firstItemIndex;

  return (
    <div>
      {
        socketList
          .sockets
          .map(socket => {
            num += 1;
            return <Socket key={socket.shortUrl} num={num} socket={socket}/>;
          })
      }
    </div>
  );
});

export { SocketList };
