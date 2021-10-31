import React, { useState } from "react";
import { Formik } from "formik";
import { FieldArray } from "formik";
import { Field, getIn } from "formik";
import "./BookDetails.css";
import { bookYupSchema, toStandardTime } from "./validationTools";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Divider } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}
  />
);

const BookDetails = ({ startingMode, book, allbooks, action }) => {
  const [mode, setMode] = useState(startingMode);
  const history = useHistory();
  const [ratingValue, setRatingValue] = React.useState(2);
  let message = "";
  let inputProps = {};
  let hideID = false;
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (mode === "view") {
    message = `Showing details for ${book.title}`;
    inputProps = { readOnly: true };
  } else if (mode === "edit") {
    message = `Editing ${book.title}`;
  } else if (mode === "create") {
    message = "New book";
    hideID = true;
  }

  return (
    <div className="editBox">
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "h5.fontSize",
            }}
          >
            {message}
          </Typography>
        </Grid>

        <Grid
          item
          xs={1}
          sx={{
            p: "0px",
            m: "0px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <IconButton
            sx={{
              p: "0px",
              m: "0px",
              alignItems: "start",
            }}
            aria-label="close"
            type="button"
            onClick={() => history.goBack()}
          >
            <CloseIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>

      <Formik
        initialValues={book}
        validationSchema={bookYupSchema}
        onSubmit={(values, { setSubmitting }) => {
          const rez = action(values);
          setSubmitting(false);
          history.go(-1);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          validateField,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={11}>
                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  color="secondary"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  InputProps={inputProps}
                />
              </Grid>
              <Grid item xs={1}>
                {hideID || (
                  <TextField
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    name="id"
                    label="ID"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.id && Boolean(errors.id)}
                    helperText={touched.id && errors.id}
                    InputProps={{ readOnly: true }}
                  />
                )}
              </Grid>
            </Grid>

            <FieldArray
              name="authors"
              render={(arrayHelpers) => (
                <Grid container rowSpacing={1} columnSpacing={4} sx={{ ml: 0 }}>
                  {values.authors &&
                    values.authors.length > 0 &&
                    values.authors.map((author, index) => (
                      <Box key={index}>
                        <Grid item xs="auto">
                          <Grid container>
                            <Grid item xs="auto">
                              <TextField
                                variant="standard"
                                fullWidth
                                margin="normal"
                                color="secondary"
                                label={`Author ${index + 1}`}
                                name={`authors[${index}]`}
                                value={author}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={inputProps}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={1}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              {mode !== "view" ? (
                                <IconButton
                                  aria-label="delete"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove an author from the list
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                              ) : (
                                <Box sx={{ mr: "10px" }}></Box>
                              )}
                            </Grid>
                          </Grid>
                          <span
                            className="validation"
                            style={{ margin: "0px" }}
                          >
                            <ErrorMessage name={`authors[${index}]`} />
                          </span>
                        </Grid>
                      </Box>
                    ))}

                  {/* Add a new empty item at the end of the list */}
                  {mode !== "view" ? (
                    <IconButton
                      aria-label="add"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      <AddRoundedIcon color="secondary" />
                    </IconButton>
                  ) : (
                    ""
                  )}
                  {mode !== "view" && values.authors.length === 0 ? (
                    <span className="validation-caption">
                      Click the icon to add an author
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
              )}
            />
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  color="secondary"
                  name="isbn"
                  label="ISBN"
                  value={values.isbn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.isbn && Boolean(errors.isbn)}
                  helperText={touched.isbn && errors.isbn}
                  InputProps={inputProps}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  color="secondary"
                  name="pages"
                  label="Pages"
                  value={values.pages}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pages && Boolean(errors.pages)}
                  helperText={touched.pages && errors.pages}
                  InputProps={inputProps}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  name="publishDate"
                  label="Published on:"
                  value={values.publishDate}
                  readOnly={inputProps.readOnly ? true : false}
                  onChange={(e) => {
                    setFieldValue("publishDate", toStandardTime(e));
                    setFieldTouched("publishDate", true, true);
                    validateField("publishDate");
                  }}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      margin="normal"
                      color="secondary"
                      {...params}
                    />
                  )}
                />
                <span className="validation">
                  {touched.publishDate && Boolean(errors.publishDate)
                    ? errors.publishDate
                    : ""}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ mb: "26px" }}>
              <Grid item xs={4}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="genre" color="secondary">
                    Genre
                  </InputLabel>
                  <Select
                    labelId="genre"
                    id="genre"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    label="Genre"
                    name="genre"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={inputProps.readOnly}
                  >
                    <MenuItem value="Science Fiction">Science Fiction</MenuItem>
                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                    <MenuItem value="Computing">Computing</MenuItem>
                    <MenuItem value="Mystery">Mystery</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                  </Select>
                </FormControl>
                <span className="validation-center">
                  {touched.genre && Boolean(errors.genre) ? errors.genre : ""}
                </span>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography component="legend" sx={{ fontSize: "12px" }}>
                  {values.available ? "Avaialble" : "Not available"}
                </Typography>
                <Switch
                  variant="standard"
                  color="secondary"
                  name="available"
                  label="Available"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.available}
                  value={values.available}
                  error={touched.available && Boolean(errors.available)}
                  helperText={touched.available && errors.available}
                  InputProps={inputProps}
                  disabled={inputProps.readOnly}
                />
                {/* <span className="validation-center">
                  {touched.available && Boolean(errors.available)
                    ? errors.available
                    : ""}
                </span> */}
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="legend"
                    sx={{ fontSize: "12px", mb: "4px" }}
                  >
                    Rating
                  </Typography>
                  <Rating
                    name="rating"
                    label="Rating"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rating}
                    size="large"
                    precision={0.5}
                    sx={{
                      color: "secondary.main",
                    }}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    disabled={inputProps.readOnly}
                  />
                </Box>
                <span className="validation-center">
                  {/* {touched.rating && Boolean(errors.rating)
                    ? errors.rating
                    : ""} */}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {mode === "view" ? (
                ""
              ) : (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    disabled={isSubmitting}
                    variant="text"
                    color="secondary"
                    type="submit"
                  >
                    {`SAVE CHANGES FOR ${values.title}`}
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Book stored!
                    </Alert>
                  </Snackbar>
                </Grid>
              )}
            </Grid>
            {mode === "view" ? (
              <Box>
                <Typography
                  sx={{
                    pt: "40px",
                    pb: "20px",
                    fontWeight: "bold",
                    fontSize: "h7.fontSize",
                    textAlign: "left",
                  }}
                >
                  Written by authors:
                </Typography>
                {values.authors &&
                  values.authors.length > 0 &&
                  values.authors.map((author, index) => (
                    <Box key={index}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{author}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {allbooks.map((book, index) => {
                            if (book.authors.includes(author)) {
                              return (
                                <Box key={index}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    textAlign="left"
                                    // color="secondary"
                                  >
                                    {`${
                                      book.title
                                    }, published in ${book.publishDate.slice(
                                      0,
                                      4
                                    )}, in
                                  genre: ${book.genre}`}
                                  </Typography>
                                  <Divider sx={{ bgcolor: "secondary.main" }} />
                                </Box>
                              );
                            }
                          })}
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}
              </Box>
            ) : (
              ""
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

BookDetails.defaultProps = {
  book: {
    id: null,
    authors: "",
    publishDate: "",
    rating: "",
    genre: "",
    title: "",
    isbn: "",
    available: "",
    pages: "",
  },
  startingMode: "view",
};

export default BookDetails;
