import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "@emotion/styled";
// Navigation
import Navigation from "./components/Navigation";
// pages
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const App = () => {
  return (
    <AppContainer>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <ProtectedRoute path="/protected" component={ProtectedPage} />
        </Switch>
      </Router>
    </AppContainer>
  );
};

export default App;
