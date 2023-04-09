import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../index";
import { fetchFullUrl } from "../http/SocketApi";

const Redirect = () => {
    const { redirect } = useContext(Context);
    const { shortUrl } = useParams("shortUrl");

    redirect.setIsRedirect(true);

    fetchFullUrl(shortUrl)
        .then(response => {
            window.location.replace(response.data.full_url);
        });
}

export { Redirect };
