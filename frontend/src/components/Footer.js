import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography } from "@mui/material";

import { Context } from "../index";

const Footer = observer(() => {
  const { redirect } = useContext(Context);

  if (redirect.isRedirect) {
    return (
      <></>
    );
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
        Link Shortener is a tool that helps to reduce long
        URLs to shorter and more manageable
      </Typography>

      <Typography
        sx={{
          paddingBottom: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        It is an important tool in today's online space,
        especially for those who often share links on various platforms.
        <br/>
        From individuals to large organizations,
        link shortening tools provide a simple and effective way to share information
        <br/>
        and track link effectiveness in an easy and user-friendly way
      </Typography>
    </Box>
  );
});

export { Footer };
