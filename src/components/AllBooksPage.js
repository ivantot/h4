import { useFilteredPagedBookList, deleteBook } from "./accessHooks";
import BookList from "./BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import * as React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useAuth } from "./useAuth";
import { Divider } from "@mui/material";

const AllBooksPage = () => {
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
  ] = useFilteredPagedBookList(10);
  const [login] = useAuth();
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "50px",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "center",
            mr: "300px",
            ml: "300px",
            // mt: "50px",
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
