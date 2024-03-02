import React, { useEffect, useRef } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BsFillFileEarmarkFill, BsFillPeopleFill } from "react-icons/bs";
import { FaCalendarWeek, FaLayerGroup, FaListOl } from "react-icons/fa";
import {
  MdLocationOn,
  MdOutlineAlternateEmail,
  MdOutlineBarChart,
  MdPhoneAndroid,
  MdTextFields,
} from "react-icons/md";
import { IoIosArrowDropdown, IoMdCheckboxOutline } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import { TiSortNumericallyOutline } from "react-icons/ti";
import {
  TbCirclesRelation,
  TbPlayerEjectFilled,
  TbStarsFilled,
} from "react-icons/tb";
import { PiFileTsDuotone, PiListFill } from "react-icons/pi";
import { FaTimeline } from "react-icons/fa6";
import { VscSymbolOperator } from "react-icons/vsc";
import { IoColorPalette, IoPerson } from "react-icons/io5";
import { RiFingerprint2Line } from "react-icons/ri";
import { ImLink } from "react-icons/im";
import { FaFlag } from "react-icons/fa6";
import { LuSunMoon } from "react-icons/lu";
import { GiBackwardTime } from "react-icons/gi";
import { RxButton } from "react-icons/rx";
import { HiOutlineHashtag } from "react-icons/hi";

const AddColumnModal = ({
  handleClose,
  show,
  addColumn,
  setSelectedButton,
}) => {
  const modalRef = useRef();
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // Click occurred outside the modal, close it
      handleClose();
    }
  };
  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const modalButton = [
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2 "
          style={{ backgroundColor: "#11DD80" }}
        >
          <FaFlag className=" fs-6 align-middle" />
        </span>
      ),
      option: "Country",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2 "
    //       style={{ backgroundColor: "#11DD80" }}
    //     >
    //       <FaLayerGroup className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Status",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#00A9FF" }}
        >
          <MdLocationOn className=" fs-6 align-middle" />
        </span>
      ),
      option: "Location",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#00A9FF" }}
    //     >
    //       <GiBackwardTime className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Last Updated",
    // },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#00A9FF" }}
    //     >
    //       <MdTextFields className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Text",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#00CFF4" }}
        >
          <MdOutlineAlternateEmail className=" fs-6 align-middle" />
        </span>
      ),
      option: "Email",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#00CFF4" }}
    //     >
    //       <BsFillPeopleFill className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "People",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#F74875" }}
        >
          <IoColorPalette className=" fs-6 align-middle" />
        </span>
      ),
      option: "Color Picker",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#F74875" }}
    //     >
    //       <IoIosArrowDropdown className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Dropdown",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#11DD80" }}
        >
          <FaCalendarWeek className=" fs-6 align-middle" />
        </span>
      ),
      option: "Week",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#11DD80" }}
    //     >
    //       <MdPhoneAndroid className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Phone",
    // },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#11DD80" }}
    //     >
    //       <AiOutlineCalendar className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Date",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#A358DF" }}
        >
          <MdOutlineBarChart className=" fs-6 align-middle" />
        </span>
      ),
      option: "Vote",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#A358DF" }}
    //     >
    //       <TiSortNumericallyOutline className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Numbers",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#595AD4" }}
        >
          <IoPerson className=" fs-6 align-middle" />
        </span>
      ),
      option: "People",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#595AD4" }}
    //     >
    //       <BsFillFileEarmarkFill className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Files",
    // },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#FFCC00" }}
    //     >
    //       <TbCirclesRelation className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Connect team",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#FFCC00" }}
        >
          <HiOutlineHashtag className=" fs-6 align-middle" />
        </span>
      ),
      option: "Tags",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#FFCC00" }}
    //     >
    //       <FaListOl className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Auto Number",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#11DD80" }}
        >
          <RxButton className=" fs-6 align-middle" />
        </span>
      ),
      option: "Button",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#11DD80" }}
    //     >
    //       <TbStarsFilled className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Rating",
    // },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#11DD80" }}
    //     >
    //       <PiFileTsDuotone className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Teams Doc",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#00CFF4" }}
        >
          <LuSunMoon className=" fs-6 align-middle" />
        </span>
      ),
      option: "World Clock",
    },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#00CFF4" }}
        >
          <FaTimeline className=" fs-6 align-middle" />
        </span>
      ),
      option: "Timeline",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#A358DF" }}
    //     >
    //       <ImLink className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Link",
    // },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#A358DF" }}
    //     >
    //       <VscSymbolOperator className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Formula",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#F74875" }}
        >
          <RiFingerprint2Line className=" fs-6 align-middle" />
        </span>
      ),
      option: "Item ID",
    },
    // {
    //   icon: (
    //     <span
    //       className="addColumn_modalBtn_icon me-2"
    //       style={{ backgroundColor: "#F74875" }}
    //     >
    //       <IoMdCheckboxOutline className=" fs-6 align-middle" />
    //     </span>
    //   ),
    //   option: "Checkbox",
    // },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#00A9FF" }}
        >
          <TbPlayerEjectFilled className=" fs-6 align-middle" />
        </span>
      ),
      option: "Priority",
    },
    {
      icon: (
        <span
          className="addColumn_modalBtn_icon me-2"
          style={{ backgroundColor: "#595AD4" }}
        >
          <PiListFill className=" fs-6 align-middle" />
        </span>
      ),
      option: "Label",
    },
  ];

  return (
    <span
      className="addColumnModal position-absolute  border-0 fs_14 "
      ref={modalRef}
    >
      <Row className="p-4">
        {modalButton.map((btn, index) => (
          <Col xs={"6"} key={index}>
            <Button
              className="workspace-dropdown-button workspace-dropdownBtn align-self-center py-2 w-100 px-2 flex"
              onClick={() => {
                addColumn(btn.option);
                setSelectedButton(btn.option);
                handleClose();
              }}
            >
              {btn.icon}
              {btn.option}
            </Button>
          </Col>
        ))}
      </Row>
    </span>
  );
};

export default AddColumnModal;
