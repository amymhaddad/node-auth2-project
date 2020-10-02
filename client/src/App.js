import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Users from "./components/Users"
import Header from "./common/Header"
 
function App() {
  return (
    <div>
      <Switch>
        <Route to="/signup" exact component={SignUp} />
        <Route to="/signin" exact component={SignIn} />
        <Route to="/users" exact component={Users} />
        </Switch>
    </div>
  );
}

export default App;
