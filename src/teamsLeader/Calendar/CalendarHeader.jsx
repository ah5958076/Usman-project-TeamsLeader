import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Form, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { useStateContext } from "../../contexts/ContextProvider";

const CalendarHeader = ({ handleNextMonth, handlePreviousMonth, month }) => {
  const statusItems = [
    { color: "#00C875", label: "Done" },
    { color: "#FDAB3D", label: "In Progress" },
    { color: "#7F5347", label: "Pending" },
    { color: "#e2445c", label: "Stuck" },
    { color: "#2B76E5", label: "Ready To Start" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(statusItems.length > 5);
  }, [statusItems]);

  const handleSlide = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, statusItems.length - 5)
      );
    }
  };

  const { monthIndex, setMonthIndex } = useStateContext();
  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };
  return (
    <div className="relative pb-[16px] flex items-center">
      <div className="flex position-relative align-items-center me-2 search_inputDiv">
        <RxMagnifyingGlass className="position-absolute ms-1 search_icon" />
        <Form.Control
          type="text"
          placeholder="Search"
          className="px-4 py-1 shadow-none workspace_searchInput transparent_bg"
        />
      </div>
      {/* <div className="border-l border-solid border-[#6b7280] h-200 w-7 h-7 ml-1"></div> */}
      <header className="flex items-center">
        <button
          className="hover:bg-[#dcdfec] border rounded py-2 px-4 mr-5 text-sm transition duration-300"
          onClick={handleReset}
        >
          Today
        </button>
        <button
          onClick={handlePreviousMonth}
          className="hover:bg-[#dcdfec] hover:rounded-full mx-2 mt-[0.2rem] w-[28px] h-[28px] transition duration-300"
        >
          <span className="cursor-pointer text-gray-600 flex justify-center items-center">
            <MdChevronLeft className="text-xl" />
          </span>
        </button>
        <button
          onClick={handleNextMonth}
          className="hover:bg-[#dcdfec] hover:rounded-full mx-2 mt-[0.2rem] w-[28px] h-[28px] transition duration-300"
        >
          <span className="cursor-pointer text-gray-600 flex justify-center items-center">
            <MdChevronRight className="text-xl" />
          </span>
        </button>
        <h2 className="ml-4 text-[1rem] text-[#6b7280] mt-[0.8rem]">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
        <div className="calendarStatus_barWrapper">
          <div className="calendarStatus_SliderContainer">
            <div
              className="calendarStatus_Container"
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              {statusItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <figure className="label_calendar_field">
                    <figcaption
                      className="label_calendar_circle"
                      style={{ backgroundColor: item.color }}
                    ></figcaption>
                  </figure>
                  <span className="label_calendar_fieldName">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="sliderButton left"
            onClick={() => handleSlide("left")}
          >
            ←
          </button>
          <button
            className="sliderButton right"
            onClick={() => handleSlide("right")}
          >
            →
          </button>
        </div>
      </header>
    </div>
  );
};

export default CalendarHeader;
