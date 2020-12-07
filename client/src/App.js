import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// Navigation
import Navigation from "./components/Navigation";
// pages
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import ProtectedPage from "./components/ProtectedPage";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/protected" component={ProtectedPage} />
      </Switch>
    </Router>
  );
};

export default App;

// this is not doing anything right now
const PrivateRoute = ({ children, ...rest }) => {
  let auth = true;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
