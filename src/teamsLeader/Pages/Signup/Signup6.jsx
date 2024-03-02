import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { Button, Form } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import IMAGES from "../../../assets/images/Images";
import { useNavigate } from "react-router-dom";

const Signup6 = () => {
  const [data, setData] = useState();
  const [option, setOption] = useState(null);
  const navigate = useNavigate();
  const options = [
    "Friend / Colleague",
    "YouTube ad",
    "Social media (Facebook, Instagram, Reddit, etc.)",
    "Search engine (Google, Bing, etc.)",
    "LinkedIn",
    "Audio ad (Podcast, Spotify)",
    "Billboard / Public transit ad",
    "Software review sites",
    "TV / Streaming service",
    "Consultant",
    "Other",
  ];

  const handleRoleClick = (item) => {
    const radio = document.getElementById(item);
    if (radio) {
      radio.click();
    }
  };

  return (
    <div className="signup_form w-100">
      <div
        className="login_header flex align-items-center border-bottom px-3 mb-5 "
        style={{ height: "65px", backgroundColor: "#F7F7F7" }}
      >
        <h5 className="align-self-center mb-0">TEAMSLEADER</h5>
        <img
          src={IMAGES.LEAF}
          alt=""
          className="align-self-center leaf_icon "
        />
      </div>

      <div className="mx-auto " style={{ width: "530px" }}>
        <div>
          <p
            className="mb-0 text-center"
            style={{ fontSize: "30px", marginTop: "24px" }}
          >
            One last question, how did you hear about us?
          </p>
        </div>

        <div className="flex justify-content-center pt-3 gray_text flex-wrap">
          {options.map((item, index) => (
            <span
              key={index}
              className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer select_check"
              onClick={() => handleRoleClick(item)}
            >
              <Form.Check
                onClick={() => handleRoleClick(item)}
                className="cursor_pointer text-nowrap "
                type="checkbox"
                aria-label="radio 1"
                label={item}
                id={item}
                style={{ padding: "8px 20px 8px 44px" }}
              />
            </span>
          ))}
        </div>
        <div className="flex justify-content-evenly mt-4 mb-5">
          <Button
            className="workspace-dropdown-button border align-items-center d-flex fw-normal    py-1  px-3 "
            style={{
              height: "40px",
            }}
            onClick={() => setActiveView("view5")}
          >
            <MdChevronLeft className="me-2 fs-5" />
            Back
          </Button>
          <Button
            onClick={() => navigate("/invite-team")}
            type="submit"
            className="rounded-1 d-flex  justify-content-end  align-items-center green_btn border-0"
            style={{ width: "126px" }}
          >
            Continue <MdChevronRight className="ms-2 fs-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup6;
