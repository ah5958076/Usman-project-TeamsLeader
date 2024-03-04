import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { TbGridDots } from "react-icons/tb";
import IMAGES from "../../assets/images/Images";
import { BsArchive, BsCodeSlash, BsMoon, BsStars } from "react-icons/bs";
import { AiOutlineBell, AiOutlineUserAdd } from "react-icons/ai";
import {
  FiChevronRight,
  FiInbox,
  FiPlus,
  FiTrash,
  FiUsers,
} from "react-icons/fi";
import { PiGearSix, PiPuzzlePiece } from "react-icons/pi";
import { LiaUserLockSolid } from "react-icons/lia";

import { RxMagnifyingGlass } from "react-icons/rx";
import { BiQuestionMark, BiSun } from "react-icons/bi";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { IoExitOutline, IoPersonOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { useStateContext } from "../../contexts/ContextProvider";
import { Alert } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAPI } from "../../helpers/apis";
import { toast } from "react-toastify";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const { setTheme, isEmailVerified, setIsEmailVerified } = useStateContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  const resendEmail = async (e) => {
    e.preventDefault();

    e.target.style.pointerEvents="none";
    let response = await getAPI("/api/user/resend-mail");
    if(response.status===200){
      toast.success(response.data.message);
    }else if(response.status===401){
      toast.error(response.data.message);
      navigate("/login");
    }else{
      toast.error(response.data.message);
    }
    e.target.style.pointerEvents="initial";
  }


  return (
    <>
      {isEmailVerified ? null : (
        <Alert
          className="email-verify-message"
          message={
            <span className="fs_15">
              Please confirm your email address: {user.emailAddress} &nbsp;
              <a
                href="#"
                onClick={resendEmail}
                style={{ color: "white", textDecoration: "underline" }}
              >Resend email</a>
              &nbsp;&nbsp;
              <a
                href="#"
                style={{ color: "white", textDecoration: "underline" }}
              >Change email address</a>
            </span>
          }
          type="info"
        />
      )}
      <div className="flex px-4 py-1">
        <span className="flex">
          {/* <Button className="p-0 workspace_menuBtn bgHover align-middle me-3">
          <TbGridDots />
        </Button> */}
          {/* <img
          src={IMAGES.LOGO}
          alt=""
          className="logo align-self-center mb-1 "
        /> */}
          <h5 className="align-self-center mb-0">TEAMSLEADER</h5>
          <img
            src={IMAGES.LEAF}
            alt=""
            className="align-self-center leaf_icon me-2"
          />
          <button className="p-0 flex items-center px-2 nav_planBtn align-middle bg-transparent align-self-center ms-3">
            <BsStars /> See plans
          </button>
        </span>

        <span className="flex ms-auto ">
          <Button className="p-0 workspace_menuBtn bgHover align-middle me-1">
            <LiaUserLockSolid />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover align-middle me-1">
            <AiOutlineBell />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover align-middle me-1">
            <FiInbox />
          </Button>

          <Button className="p-0 workspace_menuBtn bgHover align-middle me-1">
            <AiOutlineUserAdd />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover align-middle ">
            <PiPuzzlePiece />
          </Button>
          <div className="vr mx-1 nav_splitter align-self-center"></div>
          <Button className="p-0 workspace_menuBtn bgHover align-middle me-1">
            <RxMagnifyingGlass />
          </Button>
          <Button className="p-0 workspace_menuBtn bgHover align-middle me-1">
            <BiQuestionMark />
          </Button>
          {/* <span className="nav-avatar flex align-self-center">
          <img src={IMAGES.LEAF} alt="" className="align-self-center" />
        </span> */}
          <span
            onClick={handleShow}
            className="nav-avatar rounded-circle align-self-center p-1 border-0"
          >
            UH
          </span>
          <div className="">
            <Modal
              show={show}
              onHide={handleClose}
              animation={false}
              id="nav_avatar_modal"
              backdropClassName="my-modal-backdrop"
            >
              <Modal.Body className="p-0">
                <Row className="w-100 m-0 border-bottom pb-3">
                  <Col xs={12} className="fs_15 border-bottom py-3">
                    {" "}
                    <img
                      src={IMAGES.LEAF}
                      alt=""
                      className="align-self-center leaf_icon me-2"
                    />
                    Usman
                  </Col>
                  <Col xs={6}>
                    <p className=" my-2 ps-2 ">Account</p>{" "}
                    <div>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <span>
                          <IoPersonOutline className="me-2 fs-6 align-middle" />
                          My profile
                        </span>
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <span>
                          <BsCodeSlash className="me-2 fs-6 align-middle" />
                          Developers
                        </span>
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <span>
                          <FiUsers className="me-2 fs-6 align-middle" />
                          Teams
                        </span>
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <span>
                          <PiGearSix className="me-2 fs-6 align-middle" />
                          Administration
                        </span>
                      </Button>
                      <Button
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <span>
                          <IoExitOutline className="me-2 fs-6 align-middle" />
                          Log out
                        </span>
                      </Button>
                    </div>
                  </Col>

                  <Col xs={6} style={{ marginTop: "39px" }}>
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span>
                        <BsArchive className="me-2 fs-6 align-middle" />
                        Archive
                      </span>
                    </Button>
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span>
                        <FiPlus className="me-2 fs-6 align-middle" />
                        Invite members
                      </span>
                    </Button>
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span>
                        <FiTrash className="me-2 fs-6 align-middle" />
                        Trash
                      </span>
                    </Button>

                    <Dropdown
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      show={isHovered}
                    >
                      <Dropdown.Toggle
                        className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                        style={{
                          height: "34px",
                        }}
                      >
                        <span>
                          <BiSun className="me-2 fs-6 align-middle" />
                          Change theme
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="theme_dropdown"
                        style={{ margin: "-3px" }}
                      >
                        <Dropdown.Item className="px-2">
                          <Button
                            className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                            style={{
                              height: "34px",
                            }}
                            onClick={() => setTheme("light_theme")}
                          >
                            <span>
                              <BiSun className="me-2 fs-6 align-middle" />
                              Light
                            </span>
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item className="px-2">
                          <Button
                            className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                            style={{
                              height: "34px",
                            }}
                            onClick={() => setTheme("night_theme")}
                          >
                            <span>
                              <BsMoon className="me-2 fs-6 align-middle" />
                              Dark
                            </span>
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item className="px-2">
                          <Button
                            className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1  px-2"
                            style={{
                              height: "34px",
                            }}
                            onClick={() => setTheme("dark_theme")}
                          >
                            <span>
                              <BsStars className="me-2 fs-6 align-middle" />
                              Night
                            </span>
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      type="button"
                      className="py-1 mt-2 px-5 ms-3 workspace_addBtn border-0"
                      style={{ backgroundColor: "#025231", height: "32px" }}
                      onClick={handleClose}
                    >
                      <BsStars className=" fs-6 align-middle " />
                      Upgrade
                    </Button>
                  </Col>
                </Row>{" "}
                <div className=" flex justify-content-between py-2 px-3">
                  <div>
                    <p className=" my-2 ps-2 mb-0 ">Working Status</p>
                    <div className="flex align-items-center">
                      <span className=" my-2 ps-2 me-3">
                        {" "}
                        <GoBell className="  me-3" />
                        Do not disturb
                      </span>
                      <span className="flex ">
                        <Form.Check
                          type="radio"
                          className="mb-0 me-3"
                          aria-label="radio 1"
                          label="On"
                          name="disturbance"
                        />
                        <Form.Check
                          type="radio"
                          className="mb-0 me-3"
                          aria-label="radio 1"
                          label="Off"
                          name="disturbance"
                        />
                      </span>
                    </div>
                  </div>
                  <span className="align-self-end mb-2  ">
                    More <FiChevronRight className=" fs-6 " />
                  </span>
                </div>
              </Modal.Body>
            </Modal>
          </div>

          <Dropdown>
            <Dropdown.Menu className="w-auto"></Dropdown.Menu>
          </Dropdown>
        </span>
      </div>
    </>
  );
};

export default Navbar;
