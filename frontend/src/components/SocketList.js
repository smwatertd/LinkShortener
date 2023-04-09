import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";

import { Socket } from "./Socket";

const SocketList = observer(() => {
    const { socketList } = useContext(Context);

    return (
        <div>
            SocketList
            {socketList.sockets.map(socket => <Socket key={socket.shortUrl} socket={socket}/>)}
        </div>
    );
});

export { SocketList };
