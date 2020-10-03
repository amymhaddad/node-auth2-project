import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
const myStorage = window.localStorage;


render (
  <Router>
    <App
      localStorage = {myStorage}
    />
  </Router>,
  document.getElementById("root")
)
