import React, { useState } from "react";
import "../../../assets/css/Login.css";
import IMAGES from "../../../assets/images/Images";
import { Button } from "react-bootstrap";
import { HiMiniArrowRight } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [nextClicked, setNextClicked] = useState(false);
  return (
    <div className="Login_Page">
      <div
        className="login_header flex align-items-center border-bottom px-3"
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

      <div className="login_body text-center p-5 ">
        {!nextClicked ? (
          <div className="email_section ">
            <p style={{ fontSize: "40px", marginTop: "24px" }}>
              Log in to your account
            </p>
            <div className="login_form">
              <p className="email_label mb-2">Enter your work email address</p>
              <input
                type="email"
                className="login_input"
                placeholder="Example@company.com"
              />
              <Button
                className="rounded-1 w-100 mt-4 align-items-center"
                style={{ padding: "11px 10px" }}
                onClick={() => setNextClicked(true)}
              >
                Next <HiMiniArrowRight className="ms-2 fs-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="login_section email_section ">
            <p style={{ fontSize: "40px", marginTop: "17px" }}>
              <strong>Log</strong> In
            </p>
            <div className="login_form2 pt-3">
              <span className="flex align-items-center pb-2">
                <span className="email_label me-3">Email</span>
                <span className="width360">
                  <input type="email" className="login_input" placeholder="" />
                </span>
              </span>
              <span className="flex align-items-center mt-3 pt-1">
                <span className="email_label me-3">Password</span>
                <span className="width360">
                  <input
                    type="password"
                    className="login_input"
                    placeholder=""
                  />
                </span>
              </span>
              <a
                className="login_link pb-1"
                href="#"
                style={{ alignSelf: "baseline", margin: "18px 0 4px 112px" }}
              >
                Forgot yor password?
              </a>
              <div className="width360">
                <Button
                  className="rounded-1 w-100  align-items-center "
                  style={{ padding: "11px 10px" }}
                >
                  Log in <HiMiniArrowRight className="ms-2 fs-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* <div className="login_seprator flex align-items-center justify-content-center my-4 pt-2">
          <span className="seperator_line"></span>
          <span className="">Or sign in with</span>
          <span className="seperator_line"></span>
        </div>
        <div className="social_login flex justify-content-center pt-2 pb-3">
          <span className="social_loginBtn">
            <FcGoogle className="me-1 fs-5" />
            Goolge
          </span>
        </div> */}

        {/* {nextClicked && (
          <div className="flex justify-content-center">
            <span className="large_seperater_line"></span>
          </div>
        )} */}

        <div className="fs_14 login_suggest mt-3 ">
          {!nextClicked ? (
            <div className="">
              <span>Don't have an account yet? </span>
              <a
                className="login_link cursor_pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </a>
            </div>
          ) : (
            <a className="login_link" href="#">
              Login to another account
            </a>
          )}
          <div>
            <span>Can't log in? </span>
            <a className="login_link" href="#">
              Visit our help center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
