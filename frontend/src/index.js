import React from "react";
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import store from './redux/store.js'

import "./index.scss";


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <>
    <CssBaseline />
      <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
  </>
);
