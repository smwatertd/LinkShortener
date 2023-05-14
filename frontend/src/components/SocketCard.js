import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { Box, Typography, IconButton } from "@mui/material";

import { ERROR_ROUTE } from "../utils/Consts";

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

  const fullUrlCopyButtonClicked = async () => {
    try {
      await navigator.clipboard.writeText(socket.fullUrl);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const shortUrlCopyButtonClicked = async () => {
    try {
      await navigator.clipboard.writeText(socket.shortUrl);
    } catch (error) {
      console.error(error);
      return;
    }
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
        <IconButton
          onClick={fullUrlCopyButtonClicked}
          sx={{
            color: "#1976d2",
          }}
        >
          <ContentCopyOutlinedIcon />
        </IconButton>
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
        <IconButton
          onClick={shortUrlCopyButtonClicked}
          sx={{
            color: "#1976d2",
          }}
        >
          <ContentCopyOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
});

export { SocketCard };
