import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button } from "@mui/material";
import { LoginBoxRevisited } from "./components/LoginBoxRevisited";
import { LoginBox } from "./components/LoginBox";
import AllBooksPage from "./components/AllBooksPage";
import BookSearchPage from "./components/BookSearchPage";
import BookDetails from "./components/BookDetails";
import { addBook } from "./components/accessHooks";
import BookDetailsPage from "./components/BookDetailsPage";
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
import "./App.css";

import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useAuth, ProvideAuth } from "./components/useAuth";

const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if (login) {
    return (
      <Button
        variant="outlined"
        margin="normal"
        color="secondary"
        onClick={() => {
          signout(() => history.push("/login"));
        }}
      >
        Sign out
      </Button>
    );
  } else {
    return (
      <Button
        variant="outlined"
        margin="normal"
        color="secondary"
        component={RouterLink}
        to="/login"
      >
        Log in / Sign up
      </Button>
    );
  }
};

const PrivateRoute = ({ children, ...rest }) => {
  const [login, error, signin, signout] = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (login) {
          return children;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }
      }}
    />
  );
};

const AddBookPage = () => {
  const [login] = useAuth();
  return (
    <BookDetails
      startingMode="create"
      action={(book) => addBook(book, login)}
    />
  );
};

const NavigationStrip = () => {
  const [login] = useAuth();
  if (login) {
    return (
      <nav className="mainNav">
        <AuthButton></AuthButton>
        <span style={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            margin="normal"
            color="secondary"
            component={RouterLink}
            to="/allbooks"
            variant="text"
            sx={{ pt: 0, pb: 0 }}
          >
            ALL BOOKS
          </Button>
          <Divider
            orientation="vertical"
            color="#ab003c"
            variant="middle"
            flexItem
          />

          <Button
            margin="normal"
            color="secondary"
            component={RouterLink}
            to="/searchbooks"
            variant="text"
            sx={{ pt: 0, pb: 0 }}
          >
            SEARCH BOOKS
          </Button>
          <Divider
            orientation="vertical"
            color="#ab003c"
            variant="middle"
            flexItem
          />

          <Button
            margin="normal"
            color="secondary"
            component={RouterLink}
            to="/searchbyauthors"
            variant="text"
            sx={{ pt: 0, pb: 0 }}
          >
            SEARCH BY AUTHORS
          </Button>
          <Divider
            orientation="vertical"
            color="#ab003c"
            variant="middle"
            flexItem
          />

          <Button
            margin="normal"
            color="secondary"
            component={RouterLink}
            to="/books/new"
            variant="text"
            sx={{ pt: 0, pb: 0 }}
          >
            ADD BOOK
          </Button>
        </Box>
      </nav>
    );
  } else {
    return (
      <nav className="mainNav">
        <AuthButton></AuthButton>{" "}
      </nav>
    );
  }
};

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <Redirect from="/" to="/login" />
          <div>
            <NavigationStrip />
            <div className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox />
                </Route>
                <Route path="/signup">
                  <LoginBoxRevisited />
                </Route>
                <PrivateRoute path="/allbooks">
                  <AllBooksPage />
                </PrivateRoute>
                <PrivateRoute path="/searchbooks">
                  <BookSearchPage />
                </PrivateRoute>
                <PrivateRoute path="/books/new">
                  <AddBookPage />
                </PrivateRoute>
                <PrivateRoute path="/books/:cid/:operation">
                  <BookDetailsPage />
                </PrivateRoute>
                <Route path="/login">
                  <LoginBox />
                </Route>
                <Route path="/">
                  <h1 style={{ color: "white" }}>BRAINS BOOKS</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
  );
}

export default App;
