import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";

import { createSocket } from "../../http/SocketApi";
import { Context } from "../../index";
import { RESULT_ROUTE } from "../../utils/Consts";
import { normalizeShortUrl } from "../../utils/SocketUtils";

const SocketForm = observer(() => {
  // Форма создания сокета
  const navigate = useNavigate();
  const { user, loading } = useContext(Context);
  const [fullUrl, setFullUrl] = useState("");

  const confirmButtonClicked = async () => {
    // Обработчик нажатия кнопки создания сокета
    loading.setIsButtonLoading(true);
    let response;

    try {
      response = await createSocket({
        fullUrl,
        isAuth: user.isAuth,
      });
      localStorage.setItem("fullUrl", response.data["full_url"]);
      localStorage.setItem("shortUrl", normalizeShortUrl(response.data["short_url"]));
      navigate(RESULT_ROUTE);
    } catch (error) {
      console.error(error);
    } finally {
      loading.setIsButtonLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        placeholder="Введите Url"
        onChange={event => setFullUrl(event.target.value)}
      >
      </TextField>
      <LoadingButton
        variant="contained"
        onClick={confirmButtonClicked}
        onChange={e => setFullUrl(e.target.value)}
        loading={loading.isButtonLoading}
        sx={{
          background: "#28384A",
        }}
      >
        Подтвердить
      </LoadingButton>
    </Box>
  );
});

export { SocketForm };
