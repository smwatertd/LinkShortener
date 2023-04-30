import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSocket, createUserSocket } from "../http/SocketApi";
import { Context } from "../index";
import { RESULT_ROUTE } from "../utils/Consts";
import { normalizeShortUrl } from "../utils/LinksUtils";

const Form = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [fullUrl, setFullUrl] = useState("https://youtube.com/");

  const getPromise = () => {
    return user.isAuth ? createUserSocket : createSocket;
  };

  const buttonClicked = async () => {
    await getPromise()({full_url: fullUrl})
      .then(response => {
        localStorage.setItem("fullUrl", response.data.full_url);
        localStorage.setItem("shortUrl", normalizeShortUrl(response.data.short_url));
      })
      .catch(error => {
        return;
      });
    navigate(RESULT_ROUTE);
  };

  return (
    <div>
      <input placeholder="Full Url" onChange={e => setFullUrl(e.target.value)}/>
      <button onClick={buttonClicked}>Confirm</button>
    </div>
  );
};

export { Form };
