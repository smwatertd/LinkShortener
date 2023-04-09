import { useContext } from "react";
import { Context } from "../index";
import { Socket } from "./Socket";
import { observer } from "mobx-react-lite";

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
