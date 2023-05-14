import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchFullUrl } from "../http/SocketApi";
import { Context } from "../index";
import { ERROR_ROUTE } from "../utils/Consts";
import { LoadingIndicatior } from "../components/LoadingIndicator";

const Redirect = () => {
  const navigate = useNavigate();
  const shortUrl = useParams("shortUrl");
  const { redirect, loading } = useContext(Context);

  const handleRedirect = async () => {
    loading.setIsPageLoading(true);
    let response;

    try {
      response = await fetchFullUrl(shortUrl);
      window.location = response.data["full_url"];
    } catch (error) {
      redirect.setIsRedirect(false);
      navigate(ERROR_ROUTE);
    } finally {
      loading.setIsPageLoading(false);
    }
  };

  useEffect(() => {
    redirect.setIsRedirect(true);
    handleRedirect();
  }, []);

  return (
    <LoadingIndicatior />
  );
};

export { Redirect };
