import { Box, Typography } from "@mui/material";

import { MainButton } from "../components/ui/MainButton";

const NotFound = () => {
  // Страница ошибки
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
      <MainButton />
    </Box>
  );
};

export { NotFound };
