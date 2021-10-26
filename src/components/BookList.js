import * as React from "react";

import books from "../static/images/books.jpg";
import m from "../static/images/m.jpg";
import sf from "../static/images/sf.jpg";
import c from "../static/images/c.jpg";
import f from "../static/images/f.jpg";
import h from "../static/images/h.jpg";
import { Avatar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { pink, green } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TableDropdown from "./TableDropdown";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./BookList.css";

const checkGenre = (genre) => {
  if (genre === "Science Fiction") {
    return sf;
  } else if (genre === "Fantasy") {
    return f;
  } else if (genre === "Computing") {
    return c;
  } else if (genre === "Mystery") {
    return m;
  } else if (genre === "Horror") {
    return h;
  } else {
    return books;
  }
};

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const isAvailable = (available) => {
  if (available) {
    return (
      <Avatar
        sx={{
          bgcolor: green[500],
          width: 24,
          height: 24,
        }}
        variant="circle"
      >
        <CheckIcon />
      </Avatar>
    );
  } else {
    return (
      <Avatar
        sx={{
          bgcolor: pink[500],
          width: 24,
          height: 24,
        }}
        variant="circle"
      >
        <CloseIcon />
      </Avatar>
    );
  }
};

const BookList = ({ list, onDelete }) => {
  return (
    <React.Fragment>
      {list.map((row) => (
        <Box
          sx={{
            padding: "15px",
            width: "300px",
          }}
          key={row.id}
        >
          <Card
            className="cardMUI"
            variant="elevation"
            elevation="20"
            sx={{
              borderRadius: "10px",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image={checkGenre(row.genre)}
              alt="genre"
            />
            <CardContent>
              <Typography variant="h6" component="div" noWrap>
                {row.title}
              </Typography>

              {row.authors.filter(onlyUnique).length > 1 ? (
                <Typography sx={{ fontSize: 12 }}>
                  {row.authors[0]} and{" "}
                  {row.authors.filter(onlyUnique).length === 2
                    ? row.authors[1]
                    : row.authors.filter(onlyUnique).length -
                      1 +
                      " other authors"}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "12px" }}>
                  {row.authors[0]}
                </Typography>
              )}
              <Typography sx={{ fontSize: "12px", mt: "2px" }}>
                {row.publishDate.slice(0, 4)}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                p: "8px",
              }}
            >
              <CardActions
                sx={{
                  flexGrow: 1,
                  p: "0",
                }}
              >
                <TableDropdown
                  text="MORE"
                  items={[
                    {
                      text: "Details",
                      link: true,
                      path: `/books/${row.id}/view`,
                    },
                    {
                      text: "Edit",
                      link: true,
                      path: `/books/${row.id}/edit`,
                    },
                    {
                      text: "Delete",
                      link: false,
                      action: () => onDelete(row.id),
                    },
                  ]}
                />
              </CardActions>
              <Box
                sx={{
                  mr: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    width: 34,
                    height: 24,
                  }}
                  variant="rounded"
                >
                  <Typography sx={{ fontSize: "12px" }}>#{row.id}</Typography>
                </Avatar>
              </Box>
              <Box
                sx={{
                  mr: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isAvailable(row.available)}
              </Box>

              <Rating
                name="read-only"
                value={row.rating}
                size="small"
                readOnly
                precision={0.2}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  color: "secondary.main",
                }}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
          </Card>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default BookList;
