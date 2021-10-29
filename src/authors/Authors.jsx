import React, { useState } from "react";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";

export const AddAuthor = ({ makeAuthor }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);
  const createAuthor = (e) => {
    e.preventDefault();
    setText("");
    makeAuthor(text);
  };

  return (
    <div>
      <Box display="flex" alignContent="center" justifyContent="center">
        <form onSubmit={createAuthor}>
          <FormControl fullWidth={true}>
            <TextField
              label="Author"
              variant="standard"
              onChange={handleChange}
              required={true}
              value={text}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 5 }}
            >
              <Add />
              Add
            </Button>
          </FormControl>
        </form>
      </Box>
    </div>
  );
};

export const Author = ({ author, authorNo }) => {
  return (
    <Container>
      <Card
        className="root"
        variant="outlined"
        style={{ marginTop: 35, background: "lightgray" }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {authorNo + 1}.&nbsp;{author}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
