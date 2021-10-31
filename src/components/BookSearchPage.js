import React, { useState } from "react";
import { deleteBook, useFilteredPagedSearchBookList } from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";
import { CircularProgress } from "@mui/material";
import "./BookSearchPage.css";
import quotes from "../static/quotes/quotes.json";
import SearchIcon from "@mui/icons-material/Search";
import { Divider } from "@mui/material";

const randomIndex = () => {
  return Math.floor(Math.random() * 100);
};

const BookSearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [quote, setQuote] = useState(randomIndex());
  const [login] = useAuth();
  const [
    changeGenre,
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
    genre,
    pageSize,
    setPageSize,
    reload,
  ] = useFilteredPagedSearchBookList(10, searchQuery);
  if (loading) {
    return <CircularProgress />;
  } else {
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
            label="Search books"
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
          {searchQuery === 0 || list.length === 0 ? (
            <Typography
              variant="caption"
              display="block"
              textAlign="left"
              color="secondary"
            >
              Your query, regretfully, yielded no meaningful results.
            </Typography>
          ) : (
            ""
          )}
        </Box>
        {searchQuery !== 0 || list.length !== 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              margin="normal"
              color={genre === "" ? "primary" : "secondary"}
              onClick={() => {
                changeGenre("");
              }}
              variant="text"
              sx={{ pt: 0, pb: 0 }}
            >
              ALL
            </Button>
            <Divider
              orientation="vertical"
              color="#ab003c"
              variant="middle"
              flexItem
            />
            <Button
              margin="normal"
              color={genre === "Computing" ? "primary" : "secondary"}
              onClick={() => changeGenre("Computing")}
              variant="text"
              sx={{ pt: 0, pb: 0 }}
            >
              Computing
            </Button>
            <Divider
              orientation="vertical"
              color="#ab003c"
              variant="middle"
              flexItem
            />
            <Button
              margin="normal"
              color={genre === "Horror" ? "primary" : "secondary"}
              onClick={() => changeGenre("Horror")}
              variant="text"
              sx={{ pt: 0, pb: 0 }}
            >
              Horror
            </Button>
            <Divider
              orientation="vertical"
              color="#ab003c"
              variant="middle"
              flexItem
            />
            <Button
              margin="normal"
              color={genre === "Mystery" ? "primary" : "secondary"}
              onClick={() => changeGenre("Mystery")}
              variant="text"
              sx={{ pt: 0, pb: 0 }}
            >
              Mystery
            </Button>
            <Divider
              orientation="vertical"
              color="#ab003c"
              variant="middle"
              flexItem
            />
            <Button
              margin="normal"
              color={genre === "Science Fiction" ? "primary" : "secondary"}
              onClick={() => changeGenre("Science Fiction")}
              variant="text"
              sx={{ pt: 0, pb: 0 }}
            >
              Sci-Fi
            </Button>
            <Divider
              orientation="vertical"
              color="#ab003c"
              variant="middle"
              flexItem
            />
            <Button
              margin="normal"
              color={genre === "Fantasy" ? "primary" : "secondary"}
              onClick={() => changeGenre("Fantasy")}
              variant="text"
              sx={{ pt: 0, pb: 0 }}
            >
              Fantasy
            </Button>
          </Box>
        ) : (
          ""
        )}
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
          {searchQuery !== 0 || list.length !== 0 ? (
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
        {searchQuery !== 0 || list.length !== 0 ? (
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

export default BookSearchPage;
