import React from "react";
import "../../../assets/css/Login.css";

import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { HiMiniArrowRight } from "react-icons/hi2";
import IMAGES from "../../../assets/images/Images";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import {postAPI} from "../../../helpers/apis";
import { toast } from "react-toastify";

const Signup0 = ({setActiveView,userEmail, setUserEmail}) => {
  const navigate = useNavigate();
  // const {  } = useStateContext();



  const verifyEmail = async (e) => {  
    e.preventDefault();

    let data = new FormData(e.target);
    let response = await postAPI("/api/user/signup/verify-email", data);
    console.log(response);
    if(response.status===200){
      setActiveView("view1");
    }else{
      toast.error(response.data.message);
    }
  }



  return (
    <div className="signup_form w-100 ">
      <div
        className="login_header flex align-items-center border-bottom px-3 mb-5 "
        style={{ height: "65px", backgroundColor: "#F7F7F7" }}
      >
        <img
          src={IMAGES.LEAF}
          className="align-self-center  me-2 "
          style={{ width: "30px" }}
          alt=""
        />
        <h2 style={{ fontWeight: "900", margin: "0", letterSpacing: "-2px" }}>
          Teams Leader
        </h2>
      </div>

      <div className="mx-auto text-center" style={{ width: "420px" }}>
        <div>
          <p className="mb-2" style={{ fontSize: "30px", marginTop: "24px" }}>
            Welcome to teamsleader.com
          </p>
          <p className="email_label mb-2">
            Get started - it's free. No credit card needed.
          </p>
        </div>
        <form onSubmit={verifyEmail} className="mt-5" style={{ width: "420px" }}>
          <input
            type="email"
            className="login_input"
            name="emailAddress"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Example@company.com"
          />
          <Button type="submit"
            className="rounded-1 w-100 mt-4 align-items-center green_btn border-0"
          >
            Continue
          </Button>
        </form>
        <div className="fs_16 login_suggest mt-4 ">
          <div className="mb-1">
            <span>By proceeding, you agree to the </span>
          </div>
          <div>
            <a className="login_link" href="#">
              Terms of Service
            </a>
            <span> and </span>
            <a className="login_link" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-5 pt-5" style={{}}>
        <span>
          Already have an account?{" "}
          <a
            className="login_link cursor_pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </a>
        </span>
      </div>
    </div>
  );
};

export default Signup0;
