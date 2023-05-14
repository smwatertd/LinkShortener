import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";

import { ERROR_ROUTE } from "../utils/Consts";

import { CopyButton } from "./ui/CopyButton";

const SocketCard = observer(() => {
  const navigate = useNavigate();
  const [ socket, setSocket ] = useState({
    fullUrl: "",
    shortUrl: "",
  });

  const getSocketFromStorage = () => {
    const fullUrl = localStorage.getItem("fullUrl");
    const shortUrl = localStorage.getItem("shortUrl");

    if (!fullUrl) {
      navigate(ERROR_ROUTE);
      return;
    }

    setSocket({
      fullUrl,
      shortUrl,
    });
  };

  useEffect(() => {
    getSocketFromStorage();
  }, []);

  return (
    <Box
      sx={{
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            color: "white",
          }}
        >
          Полный URL: {socket.fullUrl}
          <br/>
        </Typography>
        <CopyButton
          item={socket.fullUrl}
        />
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            color: "white",
          }}
        >
          Короткий URL: {socket.shortUrl}
          <br/>
        </Typography>
        <CopyButton
          item={socket.shortUrl}
        />
      </Box>
    </Box>
  );
});

export { SocketCard };
