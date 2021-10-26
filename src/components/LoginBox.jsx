import { useHistory, useLocation } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import * as React from "react";

import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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

  let { from } = location.state || { from: { pathname: "/" } };
  return (
    <div className="loginBox">
      <h3>BRAINS BOOKS</h3>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("in submit");

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
                type="submit"
                component={RouterLink}
                to="/signup"
              >
                Sign up
              </Button>
            </Box>
            <br />
            <br />

            <p className="validation">{error ? error : ""}</p>
          </form>
        )}
      </Formik>
    </div>
  );
};
