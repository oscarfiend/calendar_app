import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";

const AppRouter = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login" component={LoginScreen} />

          <Route path="/" component={CalendarScreen} />
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
