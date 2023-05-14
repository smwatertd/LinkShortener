import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import { MAIN_ROUTE } from "../../utils/Consts";

const MainButton = ({sx=null}) => {
  const navigate = useNavigate();

  const buttonClicked = () => {
    navigate(MAIN_ROUTE);
  };

  return (
    <Button
      onClick={buttonClicked}
      variant="contained"
      sx={sx}
    >
      Главная
    </Button>
  );
};

export { MainButton };
