import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { MAIN_ROUTE } from "../utils/Consts";

const NotFound = () => {
  const navigate = useNavigate();

  const mainButtonClicked = () => {
    navigate(MAIN_ROUTE);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          paddingBottom: 1,
        }}
      >
        Страница не найдена. Пожалуйста, проверьте ссылку
      </Typography>
      <Button
        variant="contained"
        onClick={mainButtonClicked}
      >
        Главная
      </Button>
    </Box>
  );
};

export { NotFound };
