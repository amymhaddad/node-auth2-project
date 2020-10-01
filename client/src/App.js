import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Users from "./components/Users"
import Header from "./common/Header"
 
function App() {
  return (
    <div>
        <Header />
        <Route to="/signup" exact component={SignUp} />
        <Route to="/signin" exact component={SignIn} />
        <Route to="/users" exact component={Users} />
    </div>
  );
}

export default App;
