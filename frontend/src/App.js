import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Search from './Components/Search';
import Spots from './Components/Spots';
import Payment from './Components/Payment';
import Book from './Components/Book';
import Navbar from './Components/Navbar';
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import './App.css';
import { useEffect } from "react";
import LotWithImage from "./Components/Lots";

function App() {

  return (
    
      <Router>
        <AuthProvider>
      <div>
        <Navbar/>
        <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/login" Component={Login} />
        <Route path="/Signup" Component={Signup} />
        <Route path="/Search" Component={Search} />
        <Route path="/Lots/:id" Component={LotWithImage} />
        <Route path="/Book/:id" Component={Book} />
        <Route path="/Spots/:id" Component={Spots} />
        <Route path="/Payment" Component={Payment} />
        <Route path="/Success" Component={Success} />
        <Route path="/Cancel" Component={Cancel} />
        </Routes>

      </div>
      </AuthProvider>
    </Router>
    
    
  );
}

export default App;
