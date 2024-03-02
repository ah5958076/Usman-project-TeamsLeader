import dayjs from "dayjs";
import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const Day = ({ day, rowIdx }) => {
  const {
    setShowEventModal,
    monthIndex,
    modalDataCalendar,
    clickedCellInfo,
    setClickedCellInfo,
  } = useStateContext();
  const isCurrentMonth = day.month() === monthIndex;
  console.log("Modal Data in Day component:", modalDataCalendar);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? " bg-blue-600 font-bold text-white rounded-full w-7 text-center"
      : "";
  };
  // if (!isCurrentMonth) {
  //   return null;
  // }
  const handleDayClick = () => {
    setShowEventModal(true);

    // Store clicked cell information
    setClickedCellInfo({
      date: day.format("DD"),
      month: day.format("MM"),
      year: day.format("YY"),
    });
  };
  return (
    <div
      className={`border border-[#e4e7f0] flex flex-col bg-white calendar_table_cell ${
        rowIdx === 0 ? "first_row" : "other_rows"
      }`}
      onClick={handleDayClick}
    >
      <header className="flex flex-col items-end ">
        {rowIdx === 0 && (
          <div className="text-sm text-center mt-1 text-[#6b7280] border-b border-[#e4e7f0] pb-1 w-full relative z-30	">
            {day.format("ddd").toUpperCase()}
          </div>
        )}
        {isCurrentMonth ? (
          <p
            className={`mr-[0.5rem]  relative z-30 text-sm p-1 my-1 text-right text-[#323338]  ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
            {/* <div> Here apply the bg color and text </div> */}
            {clickedCellInfo &&
              modalDataCalendar &&
              clickedCellInfo.date === day.format("DD") &&
              clickedCellInfo.month === day.format("MM") &&
              clickedCellInfo.year === day.format("YY") && (
                <div
                  className={`bg-[${modalDataCalendar.labelBackgroundColor}] p-1  w-[8rem] flex justify-center items-center mt-[1rem] mr-[-0.2rem] rounded mb-1`}
                >
                  <span className="text-white">
                    {modalDataCalendar.inputText}
                  </span>
                </div>
              )}
          </p>
        ) : (
          ""
        )}
      </header>
    </div>
  );
};

export default Day;
