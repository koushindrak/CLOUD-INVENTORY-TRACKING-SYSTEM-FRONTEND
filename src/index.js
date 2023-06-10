import React from "react";
import ReactDOM from "react-dom/client";
import App from "./root/App";
import {Provider} from "react-redux";
import reportWebVitals from "./utils/reportWebVitals";
import "./root/index.css";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    //using strict mode each component will be rendered twice and each api will be called twice
  // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>

    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
