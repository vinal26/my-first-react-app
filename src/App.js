import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./Media.css";
import "./App.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import * as bootstrap from 'bootstrap';
import './AppInterceptor';
import { AuthProvider } from "./Context/AuthContext";
import AuthRoute from "./Route/AuthRoute";
import { Provider } from "react-redux";
import configureAppStore from "./store/AppStore";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ApiConfig from "./config/ApiConfig";
// export var QB = require('quickblox/quickblox.min');

// var APPLICATION_ID = ApiConfig.QBDetail.APPLICATION_ID;
// var AUTH_KEY = ApiConfig.QBDetail.AUTH_KEY;
// var AUTH_SECRET = ApiConfig.QBDetail.AUTH_SECRET;
// var ACCOUNT_KEY = ApiConfig.QBDetail.ACCOUNT_KEY;
// var CONFIG = { debug: false };

// QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);

const env = process.env.REACT_APP_ENV;

window.bootstrap = bootstrap;

const RenderEnv = () => {
  if (env === 'dev') {
    return <div
      className="env_tag"
    >
      <div
        className="env_tag_inner"
      >
        STAGE
      </div>
    </div>
  }
  return <></>
}

const App = () => {

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  return (
    <Provider store={configureAppStore()}>
      <AuthProvider>
        <BrowserRouter>
          <AuthRoute />
          <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
          <RenderEnv />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
};

export default App;
