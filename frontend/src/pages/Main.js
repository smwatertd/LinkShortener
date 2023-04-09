import { useContext, useState } from "react";
import { createSocket } from "../http/SocketApi";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";

const Main = () => {
    const navigate = useNavigate();
    const { socket } = useContext(Context);

    const buttonClick = () => {
        createSocket(url)
            .then(response => {
                socket.setFullUrl(response.data.full_url);
                socket.setShortUrl(window.location.href + response.data.short_url)
                navigate("/result");
            })
            .catch(e => {
                console.log(e)
            });
    };

    const [url, setUrl] = useState('https://www.youtube.com/');
    return (
        <div>
            <button onClick={buttonClick}>Generate new url</button>
            <input type='text' onChange={e => setUrl(e.target.value)}/>
        </div>
    );
};

export { Main };
