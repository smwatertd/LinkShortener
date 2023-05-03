import { Pagination } from "@mui/material";

const CustomPagination = ({props}) => {
  const { pagesCount, currentPage, setCurrentPage } = props;

  return (
    <Pagination
      sx={{
        marginTop: 2,
      }}
      count={pagesCount}
      page={currentPage}
      onChange={(event, value) => setCurrentPage(value)}
    />
  );
};

export { CustomPagination };
