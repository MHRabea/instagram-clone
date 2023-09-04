import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { db , app} from "./firebase/config";
import FireBaseContext from "./context/firebase";
import './input.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FireBaseContext.Provider value={{app ,db}}>
     <React.StrictMode>
      <App />
    </React.StrictMode>
  </FireBaseContext.Provider>
);



