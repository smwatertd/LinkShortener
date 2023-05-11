import { useContext } from "react";
import { Pagination } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Context } from "../index";

const CustomPagination = () => {
  const navigate = useNavigate();
  const { pagination } = useContext(Context);

  const setPage = (page) => {
    pagination.setPage(page);
    navigateToPage();
  };

  const navigateToPage = () => {
    navigate({
      search: createSearchParams({
        page: pagination.page,
        pageSize: pagination.pageSize,
      }).toString(),
    });
  };

  return (
    <Pagination
      sx={{
        marginTop: 2,
      }}
      count={pagination.pagesCount}
      page={pagination.page}
      onChange={(event, value) => setPage(value)}
    />
  );
};

export { CustomPagination };
