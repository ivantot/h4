import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  usePagedBookList,
  deleteBook,
  usePagedSearchByAuthorBookList,
} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";
import { CircularProgress } from "@mui/material";
import "./BookSearchPage.css";
import quotes from "../static/quotes/quotes.json";
import SearchIcon from "@mui/icons-material/Search";
const randomIndex = () => {
  return Math.floor(Math.random() * 100);
};

const AuthorSearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [quote, setQuote] = useState(randomIndex());
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
  ] = usePagedSearchByAuthorBookList(10, searchQuery);
  if (loading) {
    return <CircularProgress />;
  } else {
    console.log(quote);
    return (
      <React.Fragment>
        <Box
          className="searchBox"
          sx={{
            border: 2,
            borderColor: "secondary.main",
            borderRadius: "10px",
          }}
        >
          <TextField
            fullWidth
            sx={{ m: "0px", pb: "10px" }}
            variant="standard"
            color="secondary"
            margin="normal"
            name="search"
            label="Search authors"
            helperText={
              <Typography variant="caption" display="block">
                {quotes.quotes[quote].quote}
              </Typography>
            }
            value={query}
            focused
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
            }}
          />
          <Button
            sx={{ p: "0px", justifyContent: "end" }}
            variant="text"
            color="secondary"
            onClick={() => {
              setQuote(randomIndex());
              setSearchQuery(query);
            }}
          >
            {" "}
            <SearchIcon color="secondary" />
          </Button>
          {list.length === 0 || query === "" ? (
            <Typography
              variant="caption"
              display="block"
              textAlign="left"
              color="secondary"
            >
              Your query, regretfully, yielded no meaningful results, please
              reflect and give it another shot.
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "center",
            mr: "300px",
            ml: "300px",
          }}
        >
          {query !== "" ? (
            <BookList
              list={list}
              onDelete={(id) => {
                deleteBook(id, login);
                reload();
              }}
            />
          ) : (
            ""
          )}
        </Box>
        {list.length !== 0 ? (
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
              `Showing page: ${page + 1} (${from}-${
                to + 1
              } from total ${count})`
            }
            labelRowsPerPage="Books per page: "
            sx={{
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
};

export default AuthorSearchPage;
