import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './Redux/store';
import  { disableReactDevTools } from "@fvilers/disable-react-devtools"
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
if( process.env.NODE_ENV === 'production') disableReactDevTools()
root.render(
  <React.StrictMode>
    <Provider store={store}>   
    <Router>
        <App />
    </Router>    
    </Provider>
  </React.StrictMode>
);


