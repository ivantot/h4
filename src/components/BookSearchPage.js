import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  usePagedBookList,
  deleteBook,
  usePagedSearchBookList,
} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";
import { CircularProgress } from "@mui/material";

const BookSearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [login] = useAuth();
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
  ] = usePagedSearchBookList(10, searchQuery);
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            mr: "200px",
            ml: "200px",
            mt: "50px",
          }}
        >
          <TextField
            sx={{ flexGrow: 1, marginLeft: "60px" }}
            margin="normal"
            name="search"
            label="Search books"
            value={query}
            focused
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
            }}
          />
          <Button
            sx={{ marginLeft: "20px" }}
            variant="contained"
            color="secondary"
            onClick={() => setSearchQuery(query)}
          >
            GO
          </Button>
        </Box>
        <BookList
          list={list}
          onDelete={(id) => {
            deleteBook(id, login);
            reload();
          }}
        />
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
            `Prikazujem stranicu ${page + 1} (${from}-${
              to + 1
            } od ukupno ${count})`
          }
          labelRowsPerPage="Redova po stranici: "
          sx={{
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        />
      </div>
    );
  }
};

export default BookSearchPage;
