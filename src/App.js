import React from "react";
import Mathmatics from "./Math/Mathmatics";
import Navb from "./Navb";
import Footer from "./Footer";
import QuickReflexes from "./QuickReflexes/QuickReflexes";
import MemoryMatch from "./MemoryMatch/MemoryMatch";
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Content from "./Content";
import Profile from "./profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Navb />
      </header>
      <main>
        <Router>
          <Routes>
            <Route exact path="/" element={<Content />} />
            <Route exact path="/Mathematics" element={isLoggedIn ? <Mathmatics /> : <Navigate to="/Login"/>} />
            <Route exact path="/MemoryMatch" element={isLoggedIn ? <MemoryMatch /> : <Navigate to="/Login"/>} />
            <Route exact path="/QuickReflexes" element={isLoggedIn ? <QuickReflexes /> : <Navigate to="/Login"/>} />
            <Route exact path="/LogIn" element={<LogIn />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </React.Fragment>
  );
}

export default App;
