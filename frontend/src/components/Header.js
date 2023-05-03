import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography } from "@mui/material";

import { Context } from "../index";

import { Navbar } from "./Navbar";

const Header = observer(() => {
  const { redirect } = useContext(Context);

  if (redirect.isRedirect) {
    return (
      <></>
    );
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
        Fast and simple URL Shortener
      </Typography>
    </Box>
  );
});

export { Header };
