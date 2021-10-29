import { useHistory, useLocation } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import * as React from "react";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {
  pink,
  lightGreen,
  blue,
  yellow,
  cyan,
  deepPurple,
  deepOrange,
} from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccessibilityNewSharpIcon from "@mui/icons-material/AccessibilityNewSharp";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Button } from "@mui/material";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import "./LoginBoxRevisited.css";

export const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();

  const handleClickShowPassword = () => {
    setValues({
      ...vals,
      showPassword: !vals.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [vals, setValues] = React.useState({
    showPassword: false,
  });

  let { from } = location.state || { from: { pathname: "/allbooks" } };
  return (
    <Box
      className="loginBox"
      sx={{ border: 2, borderColor: "secondary.main", borderRadius: "10px" }}
    >
      <Box
        sx={{ border: 2, borderColor: "secondary.main", borderRadius: "10px" }}
      >
        <AccessibilityNewSharpIcon
          sx={{ color: deepOrange[500], fontSize: 40 }}
        />
        <AccessibilityIcon sx={{ color: yellow[800], fontSize: 40 }} />
        <AccessibilityNewSharpIcon sx={{ color: blue[800], fontSize: 40 }} />
        <AccessibilityIcon sx={{ color: lightGreen[500], fontSize: 40 }} />
        <AccessibilityNewSharpIcon sx={{ color: pink[500], fontSize: 40 }} />
        <AccessibilityIcon sx={{ color: cyan[500], fontSize: 40 }} />
        <AccessibilityNewSharpIcon
          sx={{ color: deepPurple[400], fontSize: 40 }}
        />
      </Box>

      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log("in submit");

          signin(
            values.username,
            values.password,
            () => {
              setSubmitting(false);
            },
            () => {
              history.replace(from);
            }
          );
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
            <TextField
              fullWidth
              variant="standard"
              margin="normal"
              color="secondary"
              name="username"
              value={values.username}
              label="Username"
              onChange={handleChange}
            />
            <FormControl
              variant="standard"
              fullWidth
              margin="normal"
              color="secondary"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                name="password"
                label="Password"
                onChange={handleChange}
                value={values.password}
                type={vals.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {vals.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <br />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="text"
                color="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Log in
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                variant="text"
                color="secondary"
                component={RouterLink}
                to="/signup"
              >
                Sign up
              </Button>
            </Box>

            <p className="validation">{error ? error : ""}</p>
          </form>
        )}
      </Formik>
    </Box>
  );
};
