import { useContext } from "react";

import { Context } from "../index";

const Result = () => {
    const { socket } = useContext(Context);

    return (
        <div>
            Result
            {socket.fullUrl}<br />
            {socket.shortUrl}<br />
        </div>
    );
};

export { Result };
