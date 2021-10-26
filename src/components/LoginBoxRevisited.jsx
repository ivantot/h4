import { useHistory, useLocation } from "react-router-dom";

import React, { useState } from "react";
import { checkUsername } from "./accessHooks";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import "./LoginBoxRevisited.css";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// const lowercaseRegex = /^(?=(?:.*?[a-z]){2})/;
// const uppercaseRegex = /^(?=(?:.*?[A-Z]){2})/;
// const numericRegex = /^(?=.*[0-9])/;
// const specCharRegex = /^(?=.*\W)/;

// const SignupSchema = Yup.object().shape({
//   username: Yup.string().min(2, "Too Short!").required("Required"),
//   password: Yup.string()
//     .matches(lowercaseRegex, "Two lowercase letters required!")
//     .matches(uppercaseRegex, "Two uppercase letters required!")
//     .matches(numericRegex, "One number required!")
//     .matches(specCharRegex, "One special character required!")
//     .min(12, "Minimum 12 characters required!")
//     .required("Required"),
//   repeatedPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Password must be the same!")
//     .required("Required"),
// });

export const LoginBoxRevisited = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, setLogin] = useState(null);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setValues({
      ...vals,
      showPassword: !vals.showPassword,
    });
  };
  const handleClickShowPassword2 = () => {
    setValues({
      ...vals,
      showPassword2: !vals.showPassword2,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [vals, setValues] = React.useState({
    showPassword: false,
    showPassword2: false,
  });

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <div className="loginBox">
      <h3>BRAINS BOOKS - NEW USER</h3>
      <Formik
        initialValues={{ username: "", password: "", repeatedPassword: "" }}
        validate={async (values) => {
          let errors = {};
          if (!values.username) {
            errors.username = "Input required.";
          }
          if (values.username) {
            let check = await checkUsername(values.username);
            // console.log(check);
            if (check) {
              errors.username = "Username already in database.";
            }
          }

          errors.strength = 0;

          if (!/^(?=(?:.*?[a-z]){2})/.test(values.password)) {
            errors.password = "You should use two lowercase letters!";
            errors.strength++;
          }
          if (!/^(?=(?:.*?[A-Z]){2})/.test(values.password)) {
            errors.password1 = "You should use two uppercase letters!";
            errors.strength++;
          }
          if (!/^(?=.*[0-9])/.test(values.password)) {
            errors.password2 = "You should use at least one number!";
            errors.strength++;
          }
          if (!/^(?=.*\W)/.test(values.password)) {
            errors.password3 = "You should use one special character!";
            errors.strength++;
          }
          if (values.password.length < 12) {
            errors.password4 =
              "You password should have at least 12 characters!";
            errors.strength++;
          }
          for (let char of values.password) {
            let count = [...values.password].filter((x) => x === char).length;
            if (count > Math.ceil(values.password.length * 0.25)) {
              errors.password5 =
                "You password should have less than 25% repeating characters";
              errors.strength++;
              break;
            }
          }

          if (values.password !== values.repeatedPassword) {
            errors.repeatedPassword = "Passwords don't match!";
          }

          if (
            errors.strength <= 2 &&
            !errors.username &&
            values.repeatedPassword === values.password
          ) {
            errors = {};
          }
          // console.log(errors.strength);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          fetch("http://localhost:3081/app/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status !== "ok") {
                setLogin(null);
                setError(data.body);
                setSubmitting(false);
              } else {
                setLogin(data.body);
                setError("");
                history.replace(from);
              }
            })
            .catch((err) => {
              setLogin(null);
              setError(err);
              setSubmitting(false);
            });
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
          isValidating,
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
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.username && errors.username && (
              <p className="validation">{errors.username}</p>
            )}
            <br />
            <FormControl
              variant="standard"
              fullWidth
              variant="standard"
              margin="normal"
              color="secondary"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                name="password"
                value={values.password}
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
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
            <p className="validation-caption">
              Meet at least 4 (out of 6) requirements to submit.
            </p>
            {touched.password && errors.password && (
              <p className="validation">{errors.password}</p>
            )}
            {touched.password && errors.password1 && (
              <p className="validation">{errors.password1}</p>
            )}
            {touched.password && errors.password2 && (
              <p className="validation">{errors.password2}</p>
            )}
            {touched.password && errors.password3 && (
              <p className="validation">{errors.password3}</p>
            )}
            {touched.password && errors.password4 && (
              <p className="validation">{errors.password4}</p>
            )}
            {touched.password && errors.password5 && (
              <p className="validation">{errors.password5}</p>
            )}
            <FormControl
              fullWidth
              variant="standard"
              margin="normal"
              color="secondary"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                name="repeatedPassword"
                value={values.repeatedPassword}
                label="Repeated password"
                onChange={handleChange}
                type={vals.showPassword2 ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {vals.showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {errors.repeatedPassword && values.repeatedPassword.length > 0 && (
              <h4 className="validation">{errors.repeatedPassword}</h4>
            )}
            <br />
            <br />
            {errors.strength === undefined &&
            !errors.username &&
            values.repeatedPassword === values.password ? (
              <Button
                variant="text"
                color="secondary"
                type="submit"
                disabled={isSubmitting}
                component={RouterLink}
                to="/login"
              >
                SIGN UP
              </Button>
            ) : (
              ""
            )}

            <p className="validation">{error ? error : ""}</p>
          </form>
        )}
      </Formik>
    </div>
  );
};
