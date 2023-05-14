import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import { createSocket } from "../../http/SocketApi";
import { Context } from "../../index";
import { RESULT_ROUTE } from "../../utils/Consts";
import { normalizeShortUrl } from "../../utils/SocketUtils";

const SocketForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [fullUrl, setFullUrl] = useState("");

  const confirmButtonClicked = async () => {
    let response;

    try {
      response = await createSocket({
        fullUrl,
        isAuth: user.isAuth,
      });
    } catch (error) {
      console.error(error);
      return;
    }

    localStorage.setItem("fullUrl", response.data.full_url);
    localStorage.setItem("shortUrl", normalizeShortUrl(response.data.short_url));
    navigate(RESULT_ROUTE);
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
      <Button
        variant="contained"
        sx={{
          background: "#28384A",
        }}
        onClick={confirmButtonClicked}
        onChange={e => setFullUrl(e.target.value)}
      >
        Подтвердить
      </Button>
    </Box>
  );
};

export { SocketForm };
