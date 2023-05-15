import { IconButton } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const CopyButton = ({item, sx=null}) => {
  // Кнопка копирования в буфер обмена
  // item - данные, необходимые для записи в буфер обмена
  // sx - стиль кнопки
  const buttonClicked = () => {
    // Обработчик нажатия кнопки копирования в буфер обмена
    navigator.clipboard.writeText(item);
  };

  return (
    <IconButton
      onClick={buttonClicked}
    >
      <ContentCopyOutlinedIcon
        size="small"
        sx={{
          ...sx,
          color: "#1976d2",
        }}
      />
    </IconButton>
  );
};

export { CopyButton };
