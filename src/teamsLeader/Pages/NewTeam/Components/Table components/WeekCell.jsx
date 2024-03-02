import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const WeekCell = ({ rowId, setRows, rows }) => {
  const [weekNumber, setWeekNumber] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePreviousClick = () => {
    setWeekNumber((prevWeekNumber) =>
      prevWeekNumber !== null ? prevWeekNumber - 1 : 0
    );
  };

  const handleNextClick = () => {
    setWeekNumber((prevWeekNumber) =>
      prevWeekNumber !== null ? prevWeekNumber + 1 : 0
    );
    s;
  };
  useEffect(() => {
    if (weekNumber !== null) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId ? { ...row, Week: getWeekStatus() } : row
        )
      );
    }
  }, [weekNumber, rowId, setRows]);

  const getWeekStatus = () => {
    if (weekNumber === null) {
      return "";
    } else if (weekNumber === 0) {
      return "This week";
    } else if (weekNumber === 1) {
      return "In 1 week";
    } else if (weekNumber === -1) {
      return "1 week ago";
    } else if (weekNumber < -1) {
      return `${Math.abs(weekNumber)} weeks ago`;
    } else {
      return `In ${weekNumber} weeks`;
    }
  };

  return (
    <div
      className="flex  justify-content-between align-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: "27px" }}
    >
      <span style={{ width: "20px" }}>
        <button
          onClick={handlePreviousClick}
          className={`week_btn rounded-circle ${isHovered ? "" : "d-none"}`}
        >
          <FiChevronLeft />
        </button>
      </span>
      <span style={{ minWidth: "100px", textAlign: "center" }}>
        {rows.find((row) => row.id === rowId)?.Week}
      </span>
      <span style={{ width: "20px" }}>
        <button
          onClick={handleNextClick}
          className={`week_btn rounded-circle ${isHovered ? "" : "d-none"}`}
        >
          <FiChevronRight />
        </button>
      </span>
    </div>
  );
};

export default WeekCell;
