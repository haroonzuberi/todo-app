// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing from react-dom/client
import { Provider } from 'react-redux';
import store from "./redux/store"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById("root") 
);
root.render(
  <Provider store={store}>
     <React.StrictMode>
   
      <App />
   
  </React.StrictMode>
   </Provider>
);

reportWebVitals();