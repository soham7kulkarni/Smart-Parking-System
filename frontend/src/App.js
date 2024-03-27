import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Lots from './Components/Lots';
import Signup from './Components/Signup';
import Search from './Components/Search';
import Spots from './Components/Spots';
import Payment from './Components/Payment';
import Book from './Components/Book';
import Navbar from './Components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/login" Component={Login} />
        <Route path="/Signup" Component={Signup} />
        <Route path="/Search" Component={Search} />
        <Route path="/Lots" Component={Lots} />
        <Route path="/Book" Component={Book} />
        <Route path="/Spots/:id" Component={Spots} />
        <Route path="/Payment" Component={Payment} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
