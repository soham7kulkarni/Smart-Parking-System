import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Lots from './Components/Lots';
import Signup from './Components/Signup';
import Search from './Components/Search';
import Spots from './Components/Spots';
import Payment from './Components/Payment';
import Book from './Components/Book';

const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/SignUp", element: <Signup />},
  { path: "/login", element: <Login />},
  { path: "/lots", element: <Lots />},
  {path: "/Search", element: <Search />},
  {path: "/Spots", element: <Spots />},
  {path: "/Book", element: <Book />},
  {path: "/Payment", element: <Payment />}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
