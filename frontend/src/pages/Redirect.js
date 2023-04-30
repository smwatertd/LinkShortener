import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchFullUrl } from "../http/SocketApi";
import { Context } from "../index";
import { ERROR_ROUTE } from "../utils/Consts";

const Redirect = () => {
  const { redirect } = useContext(Context);
  const shortUrl = useParams("shortUrl");
  const navigate = useNavigate();

  redirect.setIsRedirect(true);

  useEffect(() => {
    fetchFullUrl(shortUrl)
      .then(response => {
        window.location = response.data.full_url;
      })
      .catch(error => {
        redirect.setIsRedirect(false);
        navigate(ERROR_ROUTE);
      });
  }, []);


  return (
    <div>
    </div>
  );
};

export { Redirect };
