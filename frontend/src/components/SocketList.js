import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Typography } from "@mui/material";

import { Context } from "../index";

import { Socket } from "./Socket";

const SocketList = observer(() => {
  // Компонент для отображения списка сокетов
  const { socketList, pagination } = useContext(Context);
  let num = pagination.firstItemIndex;

  return (
    <div>
      {
        socketList.socketsCount
          ?
          socketList
            .sockets
            .map(socket => {
              num += 1;
              return <Socket key={socket.shortUrl} num={num} socket={socket}/>;
            })
          :
          <Typography>
            У вас нет записей. Перейдите на главную, чтобы их создать
          </Typography>
      }
    </div>
  );
});

export { SocketList };
