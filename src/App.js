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
          signout(() => history.push("/"));
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

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <div>
            <nav className="mainNav">
              <Button
                margin="normal"
                color="secondary"
                component={RouterLink}
                to="/allbooks"
                variant="outlined"
                sx={{ marginRight: "10px" }}
              >
                ALL BOOKS
              </Button>
              <Button
                margin="normal"
                color="secondary"
                component={RouterLink}
                to="/searchbooks"
                variant="outlined"
                sx={{ marginRight: "10px" }}
              >
                SEARCH BOOKS
              </Button>
              <Button
                margin="normal"
                color="secondary"
                component={RouterLink}
                to="/searchauthors"
                variant="outlined"
                sx={{ marginRight: "10px" }}
              >
                SEARCH AUTHORS
              </Button>
              <Button
                margin="normal"
                color="secondary"
                component={RouterLink}
                to="/books/new"
                variant="outlined"
              >
                ADD BOOK
              </Button>
              <span style={{ flexGrow: 1 }} />
              <AuthButton></AuthButton>
            </nav>
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
