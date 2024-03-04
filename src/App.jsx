import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./teamsLeader/Home/Home";
import "./app.css";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import Login from "./teamsLeader/Pages/Login/Login";
// import Signup from "./teamsLeader/Pages/Signup.jsx/SignUp";
import InviteTeam from "./teamsLeader/Pages/InviteTeam/InviteTeam";
import HomeCustomization from "./teamsLeader/Pages/homeCustmizingPage/homeCustomization";
import HomeCustomization2 from "./teamsLeader/Pages/homeCustmizingPage/HomeCustomization2";
import PasswordManger from "./passwordManager/PasswordManger";
import Signup from "./teamsLeader/Pages/Signup/index.jsx";   
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import AdminHome from "./adminPanel/home/AdminHome";




const App = () => {
  return (
    <>
    
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/invite-team" element={<InviteTeam />} />
          <Route path="/home-customization" element={<HomeCustomization />} />
          <Route path="/home-customization2" element={<HomeCustomization2 />} />
          <Route path="/password-managment" element={<PasswordManger />} />
          {/* <Route path="/admin" element={<AdminHome />} /> */}

          {/* <Route path="*" element={<div>Page not found</div>} /> */}
        </Routes>
      </Router>
    
    </>
  );
};

export default App;
