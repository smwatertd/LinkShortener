import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchFullUrl } from "../http/SocketApi";
import { Context } from "../index";
import { ERROR_ROUTE } from "../utils/Consts";

const Redirect = () => {
  const navigate = useNavigate();
  const shortUrl = useParams("shortUrl");
  const { redirect } = useContext(Context);

  const handleRedirect = async () => {
    let response;
    
    try {
      response = await fetchFullUrl(shortUrl);
    } catch (error) {
      redirect.setIsRedirect(false);
      navigate(ERROR_ROUTE);
      return;
    }

    window.location = response.data["full_url"];
  };

  useEffect(() => {
    redirect.setIsRedirect(true);
    handleRedirect();
  }, []);
};

export { Redirect };
