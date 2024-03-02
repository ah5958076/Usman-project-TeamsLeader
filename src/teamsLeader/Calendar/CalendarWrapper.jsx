import React, { useContext, useState, useEffect } from "react";
import getMonth from "./util";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AddNewPerson from "./AddNewPerson";
import Month from "./Month";
import CalendarHeader from "./CalendarHeader";
import { useStateContext } from "../../contexts/ContextProvider";
import EventModal from "./EventModal";
import Status from "./Status";

import "./calendar.css";
const CalendarWrapper = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, setMonthIndex } = useStateContext();

  const handlePreviousMonth = () => {
    setMonthIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className="h-[90vh] flex flex-col w-[98%] relative">
        <CalendarHeader
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
          month={currentMonth}
        />
        <div className="flex flex-1 ">
          <Month month={currentMonth} />
        </div>

        <div className="flex justify-center items-center">
          {showEventModal && <EventModal />}
        </div>
        <div className="label_calendar_wrapper">
          <div className="label_bar_wrapper ">
            <div className="label_bar_container">
              <figure className="label_calendar_field">
                <figcaption className="label_calendar_circle bg-[#00C875]"></figcaption>
              </figure>
              <span className="label_calendar_fieldName">Done</span>
            </div>
            <div className="label_bar_container">
              <figure className="label_calendar_field">
                <figcaption className="label_calendar_circle bg-[#FDAB3D]"></figcaption>
              </figure>
              <span className="label_calendar_fieldName">In Progress</span>
            </div>
            <div className="label_bar_container">
              <figure className="label_calendar_field">
                <figcaption className="label_calendar_circle bg-[#7F5347]"></figcaption>
              </figure>
              <span className="label_calendar_fieldName">Pending</span>
            </div>
            <div className="label_bar_container">
              <figure className="label_calendar_field">
                <figcaption className="label_calendar_circle bg-[#2B76E5]"></figcaption>
              </figure>
              <span className="label_calendar_fieldName">Ready To Start</span>
            </div>
            <div className="label_bar_container">
              <figure className="label_calendar_field">
                <figcaption className="label_calendar_circle bg-[#e2445c]"></figcaption>
              </figure>
              <span className="label_calendar_fieldName">Stuck</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarWrapper;
