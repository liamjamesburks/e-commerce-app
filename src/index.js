import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import reportWebVitals from './reportWebVitals';

import App from './App';
import { store } from "./store/store";
// import { UserProvider } from "./components/contexts/user.context";
// import { CategoriesProvider } from "./components/contexts/categories.context";
import { CartProvider } from "./components/contexts/cart.context";

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
      {/*<BrowserRouter>*/}
          {/*<UserProvider>*/}
          {/*    <CategoriesProvider>*/}
                  <CartProvider>
          {/*            <App />*/}
                  </CartProvider>
          {/*    </CategoriesProvider>*/}
          {/*</UserProvider>*/}
      {/*</BrowserRouter>*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
