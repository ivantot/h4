import { useState } from "react";
import { usePagedBookList, deleteBook } from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useAuth } from "./useAuth";

const AllBooksPage = () => {
  const [
    list,
    location,
    loading,
    error,
    pages,
    page,
    forward,
    back,
    goToPage,
    length,
    pageSize,
    setPageSize,
    reload,
  ] = usePagedBookList(10);
  const [login] = useAuth();
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "center",
            mr: "300px",
            ml: "300px",
            mt: "50px",
          }}
        >
          <BookList
            list={list}
            onDelete={(id) => {
              deleteBook(id, login);
              reload();
            }}
          />
        </Box>
        <TablePagination
          component="div"
          count={length}
          page={page - 1}
          onPageChange={(e, p) => goToPage(p)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            setPageSize(parseInt(e.target.value, 10));
          }}
          labelDisplayedRows={({ from, to, count, page }) =>
            `Showing page: ${page + 1} (${from}-${to + 1} from total ${count})`
          }
          labelRowsPerPage="Books per page:"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        />
      </React.Fragment>
    );
  }
};

export default AllBooksPage;
