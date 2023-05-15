import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import { MAIN_ROUTE } from "../../utils/Consts";

const MainButton = ({sx=null}) => {
  // Кнопка переадресации на главную страницу
  // sx - стиль кнопки
  const navigate = useNavigate();

  const buttonClicked = () => {
    // Обработчик нажатия кнопки переадресации на главную страницу
    navigate(MAIN_ROUTE);
  };

  return (
    <Button
      onClick={buttonClicked}
      variant="contained"
      sx={{
        ...sx,
      }}
    >
      Главная
    </Button>
  );
};

export { MainButton };
