import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SocketCard } from "../components/SocketCard";
import { MAIN_ROUTE } from "../utils/Consts";

const Result = () => {
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
      <Box
        sx={{
          padding: 5,
          borderRadius: 2,
          background: "#28384A",
        }}
      >
        <SocketCard />
        <Box>
          <Button
            onClick={mainButtonClicked}
            variant="outlined"
          >
            Главная
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Result };
