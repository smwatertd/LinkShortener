import { useContext, useEffect } from "react";

import { fetchUserSockets } from "../http/UserApi";
import { Context } from "../index";
import { SocketList } from "../components/SocketList";

const Profile = () => {
    const { socketList } = useContext(Context);

    useEffect(() => {
        fetchUserSockets()
            .then(response => {
                socketList.setSockets(response.data);
            });
    }, );

    return (
        <div>
            Profile<br/>
            <SocketList />
        </div>
    );
};

export { Profile };
