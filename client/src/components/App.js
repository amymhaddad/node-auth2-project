import { Route, Switch } from 'react-router-dom';
import React from "react"
import SignIn from "./SignIn"
import Signup from "./Signup"
import Users from "./Users"
import PageNotFound from "../common/PageNotFound"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
       <ToastContainer autoClose={2000} hideProgressBar />
      <Switch>
          <Route path="/Signup" exact component={Signup} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/users" exact component={Users} />
          <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
