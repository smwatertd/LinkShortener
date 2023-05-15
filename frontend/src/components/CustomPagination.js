import { useContext } from "react";
import { Pagination } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Context } from "../index";

const CustomPagination = () => {
  // Компонент переключения страниц
  const navigate = useNavigate();
  const { pagination } = useContext(Context);

  const changePage = (page) => {
    // Обработчик изменения номера страницы
    pagination.setPage(page);
    navigateToNewPage();
  };

  const navigateToNewPage = () => {
    // Перенаправления на измененную страницу
    navigate({
      search: createSearchParams({
        page: pagination.page,
        pageSize: pagination.pageSize,
      }).toString(),
    });
  };

  if (!pagination.pagesCount || pagination.pagesCount === 1) {
    // Проверка на необходимость отображать компонент
    return;
  }

  return (
    <Pagination
      count={pagination.pagesCount}
      page={pagination.page}
      onChange={(event, page) => changePage(page)}
    />
  );
};

export { CustomPagination };
