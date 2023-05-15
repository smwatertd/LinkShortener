import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchFullUrl } from "../http/SocketApi";
import { Context } from "../index";
import { ERROR_ROUTE } from "../utils/Consts";
import { LoadingIndicatior } from "../components/LoadingIndicator";

const Redirect = () => {
  // Страница перенаправления
  const navigate = useNavigate();
  const shortUrl = useParams("shortUrl");
  const { redirect, loading } = useContext(Context);

  const handleRedirect = async () => {
    // Обработчик перенаправления
    redirect.setIsRedirect(true);
    loading.setIsRedirectLoading(true);
    let response;

    try {
      response = await fetchFullUrl(shortUrl);
      window.location = response.data["full_url"];
    } catch (error) {
      navigate(ERROR_ROUTE);
    } finally {
      redirect.setIsRedirect(false);
      loading.setIsRedirectLoading(false);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <LoadingIndicatior />
  );
};

export { Redirect };
