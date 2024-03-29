import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import { useStateContext } from "../../contexts/ContextProvider";
import SlateEditor from "../Pages/DocCreater/SlateEditor";
import { getAPI } from "../../helpers/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const {
    theme,
    setTheme,
    isSidebarVisible,
    setIsSidebarVisible,
    isEmailVerified,
  } = useStateContext();

  useEffect(() => {
    getAPI("/api/user/get-user-from-token").then((response) => {
      if(response.status===200){
        setUser(response.data._doc);
      }
    }).catch((e) => {
      if(e.response.status===401){
        return navigate("/login");
      }
      toast.error(e.response.data.message);
    });
  }, []);

  useEffect(() => {
    document.body.className = theme;
    var pathname = window.location.pathname;
    var body = document.body;

    if (pathname.includes("/login") || pathname === "/signup") {
      body.classList.add("white_body");
    } else {
      body.classList.add("green_body");
    }
  }, [theme]);

  const toggleNavbar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    // <Router>
    <div>
      {/* <Alert message="Success Text" type="success" /> */}
      <div className="Navbar p-0 w-100 " style={{ zIndex: 999 }}>
        <Navbar setTheme={setTheme} user={user} />
      </div>

      <div className="app-container flex">
        <div
          className={`sidebar ${isEmailVerified ? "" : "top88"}  ${
            isSidebarVisible ? "" : "collapse_sidebar"
          }`}
        >
          <Sidebar
            toggleNavbar={toggleNavbar}
            isSidebarVisible={isSidebarVisible}
          />
        </div>
        <div
          className={`main-content ${isEmailVerified ? "" : "top88"} ${
            isSidebarVisible ? "" : "expanded"
          } `}
        >
          {/* <NewTeam /> */}
          {/* <DocCreater />    */}
          <SlateEditor />
          {/* <EmailVerificationModal /> */}
        </div>
      </div>
    </div>
    // </Router>
  );
};

export default Home;
