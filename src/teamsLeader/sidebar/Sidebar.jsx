import React, { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { SlHome } from "react-icons/sl";
import { BsFillChatDotsFill, BsThreeDots } from "react-icons/bs";
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import { AiOutlineBug, AiOutlineLeft } from "react-icons/ai";
import { BiChevronDown, BiSolidFileExport, BiLockAlt } from "react-icons/bi";
import { IoDocuments } from "react-icons/io5";
import { RxMagnifyingGlass } from "react-icons/rx";
import { PiClockCounterClockwiseFill, PiFunnel } from "react-icons/pi";
import { FiPlus, FiSidebar } from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import { DiScrum } from "react-icons/di";
import { TbFileInvoice } from "react-icons/tb";
import { CiLock } from "react-icons/ci";

import { LuFileInput } from "react-icons/lu";
import { useStateContext } from "../../contexts/ContextProvider";
// import { BiSolidFileExport } from "react-icons/md";
// import "../../assets/css/sidebar.css";

const Sidebar = ({ toggleNavbar }) => {
  const { isSidebarVisible } = useStateContext();
  // const [isSubmenuVisible, setSubmenuVisible] = useState(true);
  // const handleSubmenu = () => {
  //   setSubmenuVisible(!isSubmenuVisible);
  // };
  // console.log(isSubmenuVisible, "isSubmenuVisible");
  const [isButtonVisible, setButtonVisible] = useState(false);
  const HandleMouseEnter = () => {
    setButtonVisible(true);
  };
  const HandleMouseLeave = () => {
    setButtonVisible(false);
  };
  const HandleInputFocus = () => {
    setButtonVisible(true);
  };
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleMouseEnter = () => {
    setIsButtonActive(true);
  };

  const handleMouseLeave = () => {
    setIsButtonActive(false);
  };

  const [activeButton, toggleButton] = useToggleButton();

  // const submenu_options = [
  //   {
  //     name: "Tasks",
  //     icon: <FiSidebar className="me-2" />,
  //   },
  //   {
  //     name: "Sprints",
  //     icon: <DiScrum className=" fs-4" />,
  //   },
  //   {
  //     name: "Epics",
  //     icon: <LuCrown className="me-2 " />,
  //   },
  //   {
  //     name: "Bugs Queue",
  //     icon: <AiOutlineBug className="me-2 " />,
  //   },
  //   {
  //     name: "Retrospectives",
  //     icon: <PiClockCounterClockwiseFill className="me-2 " />,
  //   },
  //   {
  //     name: "Getting Started",
  //     icon: <BiFile className="me-2" />,
  //   },
  // ];
  // const [ActiveButton, setActiveButton] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newTeam, setNewTeam] = useState([]);
  const [teamInputValue, setTeamInputValue] = useState("");
  // const handleSubmit = (e) => {

  //   e.preventDefault();
  //   setNewTeam([...newTeam, teamInputValue]);
  //   setTeamInputValue("");
  //   handleClose();
  // };
  return (
    <div className="sidebar_widthDiv ">
      <div className=" w-100 m-0 ">
        <span className="top-0 end-0 sidebar_toggleBtn position-absolute">
          <Button className=" " onClick={() => toggleNavbar()}>
            <AiOutlineLeft className="" />
          </Button>
        </span>
        <div className={` ${isSidebarVisible ? "" : "d-none"}`}>
          <Stack
            gap={1}
            className="ps-3 pe-5 pt-3 pb-3 sidebar_topBtn border-bottom "
          >
            <Button
              className={`w-100 text-start ${
                activeButton === 1 ? "selected_bg" : "transparent_bg"
              }`}
              onClick={() => toggleButton(1)}
            >
              <SlHome className="me-2 " /> Home
            </Button>

            <Button
              className={`w-100 text-start ${
                activeButton === 2 ? "selected_bg" : "transparent_bg"
              }`}
              onClick={() => toggleButton(2)}
            >
              <FaRegCalendarCheck className="me-2 " />
              My work
            </Button>

            <Button
              className={`w-100 text-start ${
                activeButton === 3 ? "selected_bg" : "transparent_bg"
              }`}
              onClick={() => toggleButton(3)}
            >
              <span className="flex">
                <LuFileInput className="me-2 " />
                Proposals
              </span>
            </Button>
            <Button
              className={`w-100 text-start ${
                activeButton === 4 ? "selected_bg" : "transparent_bg"
              }`}
              onClick={() => toggleButton(4)}
            >
              <span className="flex">
                <TbFileInvoice className="me-2 " />
                Invoices
              </span>
            </Button>
            {/* <Link to="/password-managment " className="text-decoration-none">
              <Button
                className={`w-100 text-start ${
                  activeButton === 5 ? "selected_bg" : "transparent_bg"
                }`}
                onClick={() => toggleButton(5)}
              >
                <span>
                  <CiLock className="me-2 " />
                  Passwords
                </span>
              </Button>
            </Link> */}
          </Stack>

          <div className="flex m-3  ">
            <Button
              className="workspace-dropdown-button workspace-dropdownBtn align-self-center w-100 text-start py-1 me-2 px-2"
              // onClick={handleShow}
            >
              <span className="workspace_icon  me-2">M</span>
              My Team
              <BiChevronDown className="float-end fs-5 " />
            </Button>
            <Button className="p-2 workspace_menuBtn bgHover align-middle">
              <BsThreeDots />
            </Button>
          </div>

          {/* 
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you are reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}

          <div className="flex m-3 ">
            <div className="flex position-relative align-items-center me-2 search_inputDiv">
              <RxMagnifyingGlass className="position-absolute ms-1 search_icon" />
              <Form.Control
                type="text"
                placeholder="Search"
                className="px-4 py-1 shadow-none workspace_searchInput transparent_bg"
                onFocus={HandleInputFocus}
                onMouseEnter={HandleMouseEnter}
                onMouseLeave={HandleMouseLeave}
              />
              {isButtonVisible && (
                <Button
                  className="px-1 py-0 workspace_menuBtn bgHover position-absolute end-0 text-center mx-1"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  onMouseEnter={HandleMouseEnter}
                  onMouseLeave={HandleMouseLeave}
                >
                  <PiFunnel className="fs-6  mt-1" />
                </Button>
              )}
            </div>
            <Dropdown className="add_team_dropdown">
              <OverlayTrigger
                overlay={<Tooltip>Add item to work space</Tooltip>}
              >
                <Dropdown.Toggle
                  className="p-2 workspace_menuBtn bgHover workspace_addBtn"
                  style={{ backgroundColor: "#025231" }}
                >
                  <FiPlus />
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow} href="#/action-1">
                  Create Team
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Modal
              className="team_modal"
              show={show}
              onHide={handleClose}
              animation={true}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewTeam([...newTeam, teamInputValue]);
                  setTeamInputValue("");
                  closeModal();
                }}
              >
                <Modal.Header closeButton className="border-0 px-0 pb-0">
                  <h2>Create Team</h2>
                </Modal.Header>
                <Modal.Body className="px-0 ">
                  <span>
                    <p className="fs_14 p-0 mb-2">Team name</p>
                    <Form.Control
                      type="text"
                      value={teamInputValue}
                      onChange={(e) => setTeamInputValue(e.target.value)}
                      placeholder="New Team"
                      className=" py-2  mb-3 shadow-none workspace_searchInput transparent_bg"
                    />
                  </span>{" "}
                  <div className="">
                    <p className="fs_14 p-0">Privacy</p>

                    <div className="mt-2 pb-4 border-bottom border-2">
                      <Form.Check
                        className=".fs_15"
                        inline
                        type="radio"
                        aria-label="radio 1"
                        label="Client can see this"
                        name="privacy"
                      />
                      <Form.Check
                        inline
                        type="radio"
                        aria-label="radio 2"
                        className="me-0 .fs_15"
                        label=""
                        name="privacy"
                      />
                      <BiLockAlt className="me-1 mb-1" />
                      Only team can see this
                    </div>
                  </div>{" "}
                  <div className="mt-4 ">
                    <p className="fs_16 p-0">
                      Select what you're managing in this team
                    </p>
                    <Row className="mt-3 align-items-center modals_radioBtn_wrapper">
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Items"
                          name="team_manage"
                        />{" "}
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 2"
                          label="Employees"
                          name="team_manage"
                        />{" "}
                      </Col>
                      <Col xs={4} className="mb-2">
                        {" "}
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Leads"
                          name="team_manage"
                        />
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Projects"
                          name="team_manage"
                        />{" "}
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Clients"
                          name="team_manage"
                        />{" "}
                      </Col>
                      <Col xs={4} className="mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          label="Tasks"
                          name="team_manage"
                        />
                      </Col>
                      <Col xs={4} className="flex mb-2">
                        <Form.Check
                          type="radio"
                          aria-label="radio 1"
                          className="mt-1 me-2"
                          name="team_manage"
                        />{" "}
                        <Form.Control
                          type="text"
                          name="team_manage"
                          placeholder="Custom"
                          className=" py-1 shadow-none workspace_searchInput transparent_bg"
                        />
                      </Col>
                    </Row>
                  </div>{" "}
                </Modal.Body>
                <Modal.Footer className="border-0">
                  <Button
                    className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
                    style={{
                      height: "40px",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="p-2 px-3  workspace_addBtn border-0"
                    style={{ backgroundColor: "#025231" }}
                    onClick={handleClose}
                  >
                    Create Team
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>

          <div className="m-3 submenu_container">
            {/* <Button
              className={`workspace-dropdown-button position-relative fw-normal align-self-center w-100 text-start py-1 me-2 px-2 ${
                isButtonActive ? "active" : ""
              }`}
              style={{
                height: "33px",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSubmenu}
            >
              <span>
                <BiCaretDown
                  className={`me-1 ${isSubmenuVisible ? "" : "rotate_Caret"}`}
                />
                My scrum team
              </span>
              {isButtonActive && (
                <Button
                  className="px-1 py-0 workspace_menuBtn bgHover position-absolute end-0 text-center mx-1"
                  style={{
                    width: "25px",
                    height: "25px",
                    verticalAlign: "middle",
                  }}
                >
                  <BsThreeDots className="fs-6 align-middle" />
                </Button>
              )}
            </Button> */}

            <div className="">
              {teamInputValue.trim() === "" &&
                newTeam.map((item, index) => {
                  return (
                    <Button
                      className="workspace-dropdown-button workspace-dropdownBtn  fw-normal align-self-center w-100 text-start py-1 me-2 px-2"
                      style={{
                        height: "34px",
                      }}
                    >
                      <span>
                        <FaUsers className="me-2 fs-6 align-middle" />
                        {item}
                      </span>
                    </Button>
                  );
                })}
              {/* {ActiveButton === index && (l
                <Button
                  className="px-1 py-0 workspace_menuBtn bgHover position-absolute end-0 text-center mx-1"
                  style={{
                    width: "25px",
                    height: "25px",
                    verticalAlign: "middle",
                  }}
                >
                  <BsThreeDots className="fs-6 align-middle" />
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="m-0" /> */}
    </div>
  );
};

export default Sidebar;

function useToggleButton() {
  const [activeButton, setActiveButton] = useState(1);

  const toggleButton = (buttonId) => {
    setActiveButton(buttonId);
  };

  return [activeButton, toggleButton];
}
