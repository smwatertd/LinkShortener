import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography } from "@mui/material";

import { Context } from "../index";

const Footer = observer(() => {
  // Нижний колонтитул
  const { redirect } = useContext(Context);

  if (redirect.isRedirect) {
    // Проверка на необходимость отображения компонента
    return;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#28384A",
      }}
    >
      <Typography
        sx={{
          padding: 2,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Link Shortener - инструмент, который поможет вам сократить длиииные ссылки,
        <br/>
        сделав их более коротким и управляемыми
      </Typography>

      <Typography
        sx={{
          paddingBottom: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        Это важный инструмент в современном онлайн-пространстве, особенно для тех,
        <br/>
        кто часто делится ссылками на различных платформах.
        <br/>
        Link Shortener - инструмент предназначенный как для частных лиц, так и для крупных организаций,
        <br/>
        обеспечивающий простой и эффективный способ обмена ссылками
      </Typography>
    </Box>
  );
});

export { Footer };
