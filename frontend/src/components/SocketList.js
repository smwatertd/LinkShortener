import { useContext } from "react";

import { Context } from "../index";

import { Socket } from "./Socket";

const SocketList = () => {
  const { socketList } = useContext(Context);

  return (
    <div>
      {
        socketList.socketList.map(socket =>
          <Socket key={socket.shortUrl} socket={socket}/>
        )
      }
    </div>
  );
};

export { SocketList };
