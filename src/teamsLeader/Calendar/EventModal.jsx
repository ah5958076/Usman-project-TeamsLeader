import React, { useState, useRef, useEffect } from "react";
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
  Container,
} from "react-bootstrap";
import Status from "./Status";
import "react-date-range/dist/styles.css"; // Import the default CSS styles
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { useStateContext } from "../../contexts/ContextProvider";
import { SlPeople } from "react-icons/sl";
import { RxAvatar } from "react-icons/rx";
import { CiCirclePlus } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import AddNewPerson from "./AddNewPerson";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { FcTimeline } from "react-icons/fc";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

const EventModal = () => {
  const inputRef = useRef();

  const [suggestedPeople, setSuggestedPeople] = useState([
    { name: "Usman Yousaf", email: "usman@gmail.com" },
    { name: "falak@gmail.com", email: "falak@gmail.com" },
    { name: "New Member", email: "newmember@gmail.com" },
  ]);

  const [numMonths, setNumMonths] = useState(2);

  const [selectedPersons, setSelectedPersons] = useState([]);

  const { showEventModal, setShowEventModal, setModalInfo, setClickedCell } =
    useStateContext();
  const [isHoveredPersoncCell, setIsHoveredPersonCell] = useState(false);
  const [zIndex, setZIndex] = useState(1);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [emailInputPopoverOpen, setEmailInputPopoverOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [statusPopover, setStatusPopover] = useState(false);
  const [isHoveredTimeline, setIsHoveredTimeline] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateCellClick, setDateCellClick] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState({});

  // ... existing code

  const handleStatusSelection = ({ labelText, bgColor }) => {
    // Store the selected status information in the state
    setSelectedStatus({ labelText, bgColor });
  };
  console.log("SelectedStatus:", selectedStatus);
  const handleResize = () => {
    if (window.innerWidth <= 765) {
      setNumMonths(1);
    } else {
      setNumMonths(2);
    }
  };

  const handleDivDateClick = () => {
    setDatePickerVisible(!isDatePickerVisible);
    setDateCellClick(true);
  };

  const handlePopoverOpen = (event) => {
    setPopoverOpen(true);
    setAnchorEl(event.currentTarget);
    setEmailInputPopoverOpen(false); // Close the email input Popover
  };
  const handleEmailInputPopoverOpen = () => {
    setEmailInputPopoverOpen(true);
  };
  const handlePopoverClose = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
  };
  const showStatusPopover = () => {
    setStatusPopover(true);
  };

  const handleClose = () => setShowEventModal(false);

  useEffect(() => {
    // Focus the input and select the text when the component mounts
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const handleMouseEnterPersonCell = () => {
    setIsHoveredPersonCell(true);
  };

  const handleMouseLeavePersonCell = () => {
    setIsHoveredPersonCell(false);
  };

  const handleAddPerson = (person) => {
    if (person.email === "") {
      handleEmailInputPopoverOpen();
    } else {
      // Update the state with the selected person and avatar
      setSelectedPersons((prevSelectedPersons) => [
        ...prevSelectedPersons,
        { ...person, avatar: getAvatarComponent(person.name, zIndex) },
      ]);
    }
    // Increment the zIndex for the next avatar
    setZIndex((prevZIndex) => prevZIndex + 1);

    // Close the popover
    handlePopoverClose();
  };
  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };
  const getAvatarComponent = (name, zIndex) => {
    if (name === "Usman Yousaf") {
      return (
        <span
          className="nav-avatar text-[0.6rem] rounded-circle align-self-center px-[0.3rem] py-[0.3rem] border-0 "
          style={{ zIndex }}
        >
          UY
        </span>
      );
    } else if (name === "falak@gmail.com") {
      return <IoPersonCircle className="text-[1.8rem] " style={{ zIndex }} />;
    }

    // Add more conditions for other persons as needed

    return null; // Default if no match
  };

  const handleRemovePerson = (index) => {
    setSelectedPersons((prevSelectedPersons) =>
      prevSelectedPersons.filter((_, i) => i !== index)
    );
  };

  const filteredSuggestedPeople = suggestedPeople.filter(
    (person) =>
      !selectedPersons.some(
        (selectedPerson) => selectedPerson.name === person.name
      )
  );
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDatePickerChange = (ranges) => {
    setState([ranges.selection]);
    // setState(ranges.selection);
  };
  // =-=============================================
  const handleCreateItem = () => {
    // Gather information from the modal
    const modalData = {
      inputText: inputRef.current.value,
      labelBackgroundColor: selectedStatus.bgColor,
      // Add more fields as needed
    };
    setModalInfo(modalData);

    // Close the modal or perform other actions
    setShowEventModal(false);
  };
  return (
    <>
      <Modal
        className=" calendar_modal"
        show={showEventModal}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton className="border-0 px-0 pb-0">
          <Row className="input-container mx-auto	">
            <Col lg={12} className="mt-3 ">
              <input
                ref={inputRef}
                type="text"
                class="editable-input"
                value="New Item"
                readonly
              />
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="px-0 ">
          <div className="flex ">
            <Container className="align-self-center">
              <Row className="grayText  mx-auto	">
                <div className="flex items-center">
                  <Col lg={4} className="mt-4 	">
                    <div className="calendar_cell_wrapper">
                      <div className="calendar_column_title">
                        <div className="mr-[8px]">
                          <VscCircleLargeFilled />
                        </div>
                        Deadline
                      </div>
                    </div>
                  </Col>
                  <Col lg={7} className="mt-4 	">
                    <div className="calendar_cell_wrapper_component">
                      <div className="pointer ">
                        <div className="calendar_component_cell">
                          <div className="calendar_group_cell_component">
                            <div className="calendar_field_text">
                              <div className="group_label">
                                <div
                                  className="group_circle "
                                  style={{ background: "rgb(0, 134, 192)" }}
                                ></div>
                                <div className="cd_text_component cd_group_title">
                                  <span>This month</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
                <div className="flex items-center">
                  <Col lg={4} className="mt-2 	">
                    <div className="calendar_cell_wrapper">
                      <div className="calendar_column_title">
                        <div className="mr-[8px]">
                          <SlPeople />
                        </div>
                        Person
                      </div>
                    </div>
                  </Col>
                  <Col lg={7} className="mt-2">
                    <div className="calendar_cell_wrapper_component">
                      <div
                        className="calendar_component_cell person_cell_component relative"
                        onClick={handlePopoverOpen}
                      >
                        <div
                          className="calendar_group_cell_component justify-center"
                          onMouseEnter={handleMouseEnterPersonCell}
                          onMouseLeave={handleMouseLeavePersonCell}
                        >
                          <div className="multiple_person">
                            {isHoveredPersoncCell && (
                              <FaCirclePlus className="multiple_person_add" />
                            )}
                            {!selectedPersons.length && (
                              <RxAvatar className="multiple_person_avatar" />
                            )}
                            {selectedPersons.map((person, index) => (
                              <div
                                key={index}
                                className={`relative flex items-center ${
                                  index > 0 ? "ml-[-.7rem]" : ""
                                }`}
                              >
                                {person.avatar}
                              </div>
                            ))}
                          </div>
                        </div>
                        {(isPopoverOpen || emailInputPopoverOpen) && (
                          <div className="topCurvePerson"></div>
                        )}
                      </div>

                      <Popover
                        anchorEl={anchorEl}
                        open={isPopoverOpen}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography sx={{ p: 2 }} className="addPersonModal">
                          <AddNewPerson
                            onPopoverOpen={isPopoverOpen}
                            onAddPerson={handleAddPerson}
                            selectedPersons={selectedPersons}
                            onRemovePerson={handleRemovePerson}
                            suggestedPeople={filteredSuggestedPeople}
                          />
                        </Typography>
                      </Popover>

                      {/* Email input Popover */}
                      <Popover
                        anchorEl={anchorEl} // You need to set the anchorEl based on the position of your email input element
                        open={emailInputPopoverOpen}
                        onClose={() => setEmailInputPopoverOpen(false)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography sx={{ p: 2 }} className="addPersonModal">
                          {/* Your email input form */}
                          <p className="text-base">
                            Type in email address to invite
                          </p>

                          <div className="add_person_wrapper">
                            <div className="addPersonSearch flex items-center">
                              <input
                                type="text"
                                placeholder="Search names, roles, or teams relative"
                                className={`focus:border-green-500 `}
                              />
                              {/* <RxMagnifyingGlass className="text-base text-[#c3c6d4] absolute right-8" /> */}
                            </div>
                          </div>
                          <div className="flex justify-end mt-3 ">
                            <Button
                              className=" mr-2 workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
                              style={{
                                height: "40px",
                                fontSize: ".8rem",
                              }}
                              onClick={() => setEmailInputPopoverOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="p-2 px-3  workspace_addBtn border-0"
                              style={{
                                backgroundColor: "#025231",
                                fontSize: ".8rem",
                              }}
                              onClick={() => setEmailInputPopoverOpen(false)}
                            >
                              {" "}
                              Invite new member{" "}
                            </Button>
                          </div>
                        </Typography>
                      </Popover>
                    </div>
                  </Col>
                </div>
                {/* ============Status==================== */}
                <div className="flex items-center">
                  <Col lg={4} className="mt-2 	">
                    <div className="calendar_cell_wrapper">
                      <div className="calendar_column_title">
                        <div className="mr-[8px]">
                          <IoIosMenu />
                        </div>
                        Status
                      </div>
                    </div>
                  </Col>
                  <Col lg={7} className="mt-2">
                    <Status onStatusSelection={handleStatusSelection} />
                  </Col>
                </div>
                {/* ============Timeline==================== */}
                <div className="flex items-center">
                  <Col lg={4} className="mt-2 	">
                    <div className="calendar_cell_wrapper">
                      <div className="calendar_column_title">
                        <div className="mr-[8px]">
                          <FcTimeline />
                        </div>
                        Timeline
                      </div>
                    </div>
                  </Col>
                  <Col lg={7} className="mt-2">
                    <div className="calendar_cell_wrapper_component">
                      <div className="calendar_component_cell cursor-pointer relative bg-[#C4C4C4 ]  py-2">
                        <div
                          className="bg-[#ABABAB] mx-2 rounded-pill hover:bg-[#c4c4c4] transition-all	duration-300 py-1"
                          onMouseEnter={() => setIsHoveredTimeline(true)}
                          onMouseLeave={() => setIsHoveredTimeline(false)}
                          onClick={handleDivDateClick}
                        >
                          <span
                            className={`text-white flex justify-center  text-sm `}
                          >
                            {state.length === 1 &&
                              !dateCellClick &&
                              (isHoveredTimeline ? "Set Dates" : "-")}

                            {state.length > 0 &&
                              dateCellClick &&
                              (state[0].startDate.getTime() ===
                              state[0].endDate.getTime()
                                ? `${format(state[0].startDate, "dd MMM ")} `
                                : // Default date formatting when startDate is not equal to endDate
                                  `${format(
                                    state[0].startDate,
                                    "dd MMM "
                                  )} - ${format(state[0].endDate, "dd MMM ")}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
            </Container>
          </div>
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
            onClick={handleCreateItem}
          >
            Create Item
          </Button>
        </Modal.Footer>
      </Modal>
      {isDatePickerVisible && (
        <DateRangePicker
          onChange={handleDatePickerChange}
          months={numMonths}
          ranges={state}
          direction="horizontal"
        />
      )}
    </>
  );
};

export default EventModal;
