import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography } from "@mui/material";

import { Context } from "../index";

import { Navbar } from "./Navbar";

const Header = observer(() => {
  // Верхний колонтитул
  const { redirect } = useContext(Context);

  if (redirect.isRedirect) {
    // Проверка на необходимость отображения компонента
    return;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#28384A",
      }}
    >
      <Navbar />
      <Typography
        variant="h5"
        sx={{
          marginTop: -2,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Link Shortener
      </Typography>
      <Typography
        variant="h6"
        sx={{
          paddingBottom: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        Быстрый и простой сократитель ссылок
      </Typography>
    </Box>
  );
});

export { Header };
