// import React from "react";
// import { useState } from "react";
// import { DatePicker, Space, Typography } from "antd";

// const TimelineCell = () => {
//   const [selectedRange, setSelectedRange] = useState(null);
//   const [formattedDateRange, setFormattedDateRange] = useState("");

//   const { RangePicker } = DatePicker;

//   const handleRangeChange = (dates) => {
//     setSelectedRange(dates);
//     if (dates) {
//       setFormattedDateRange(formatDateRange(dates));
//     } else {
//       setFormattedDateRange("");
//     }
//   };

//   const formatDateRange = (dates) => {
//     if (!dates) return "";
//     const startDate = dates[0].format("DD MMM YYYY");
//     const endDate = dates[1].format("DD MMM YYYY");
//     return `${startDate} - ${endDate}`;
//   };

//   return (
//     <div className=" position-relative d-flex justify-content-center">
//       <Space
//         direction="vertical"
//         size={12}
//         className="table_rangePicker position-absolute start-0"
//       >
//         <RangePicker
//           separator=""
//           placeholder=""
//           value={selectedRange}
//           onChange={handleRangeChange}
//         />
//       </Space>
//       <p
//         className="m-0 rounded-pill"
//         style={{
//           backgroundColor: formattedDateRange ? "#333333" : "#C4C4C4",
//           height: "25px",
//           width: "180px",
//           cursor: "pointer",
//         }}
//       >
//         {formattedDateRange}
//       </p>
//     </div>
//   );
// };

// export default TimelineCell;
import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment"; // Import moment library for date comparisons
import { Tooltip } from "@mui/material";

const TimelineCell = () => {
  const [selectedRange, setSelectedRange] = useState(null);
  const [formattedDateRange, setFormattedDateRange] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const { RangePicker } = DatePicker;
  console.log({ selectedRange });
  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
    if (dates) {
      setFormattedDateRange(formatDateRange(dates));
    } else {
      setFormattedDateRange("");
    }
  };

  const formatDateRange = (dates) => {
    if (!dates) return "";

    const startDate = dates[0].format("DD MMM YYYY");
    const endDate = dates[1].format("DD MMM YYYY");
    console.log({ startDate });
    return `${startDate} - ${endDate}`;
  };

  // Get the current date
  const currentDate = moment();

  const currentDate11 = moment("2024-02-01");
  const startDate1 = moment("2024-01-09");

  const daysDifference = currentDate11.diff(startDate1, "days");

  console.log("Days Difference:", daysDifference, currentDate11);
  // Determine the background color class based on conditions
  const getBackgroundColorClass = () => {
    if (!selectedRange) return "bg-gray-300"; // Default color when no range is selected

    const startDate = selectedRange[0].format("DD MMM YYYY");
    const endDate = selectedRange[1].format("DD MMM YYYY");
    console.log({ currentDate, startDate: selectedRange[0] });
    const formatCurrent = currentDate.format("DD MMM YYYY");
    console.log("Current Date:", formatCurrent);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    const totalDays = selectedRange[1].diff(selectedRange[0], "days");
    const daysBeforeCurrent = moment(formatCurrent, "DD MMM YYYY").diff(
      moment(startDate, "DD MMM YYYY"),
      "days"
    );
    const daysRemaining = moment(endDate, "DD MMM YYYY").diff(
      moment(formatCurrent, "DD MMM YYYY"),
      "days"
    );

    console.log({ totalDays, daysBeforeCurrent, daysRemaining });

    if (moment(endDate, "DD MMM YYYY").isBefore(currentDate, "day")) {
      console.log("bg-red-500");
      return "bg-red-500";
    } else if (
      moment(startDate, "DD MMM YYYY").isSameOrAfter(currentDate, "day")
    ) {
      console.log("bg-black");
      return "bg-black";
    } else if (moment(endDate, "DD MMM YYYY").isSame(currentDate, "day")) {
      console.log("bg-blue-500");
      return "bg-blue-500";
    } else if (
      moment(startDate, "DD MMM YYYY").isSameOrBefore(currentDate, "day") &&
      moment(endDate, "DD MMM YYYY").isSameOrAfter(currentDate, "day")
    ) {
      console.log("bg-orange-500");
      return "bg-orange-500";
    }

    return "bg-gray-300"; // Default color
  };

  // ... (remaining code)
  const getRemainingDays = () => {
    // Get background color class
    const bgColorClass = getBackgroundColorClass();

    if (bgColorClass === "bg-black" && selectedRange) {
      const currentDate = moment();
      const startDate = selectedRange[0];
      const endDate = selectedRange[1];

      // Calculate remaining days
      const remainingDays = endDate.diff(currentDate, "days") + 1;

      return `${remainingDays} days left`;
    } else if (
      (bgColorClass === "bg-red-500" || bgColorClass === "bg-orange-500") &&
      selectedRange
    ) {
      const currentDate = moment();
      const endDate = selectedRange[1];

      // Calculate remaining days to end date
      const remainingDays = endDate.diff(currentDate, "days") + 1;
      let title = "";
      if (bgColorClass === "bg-red-500") title = "overdue";
      if (bgColorClass === "bg-orange-500") title = "left";

      return `${Math.abs(remainingDays)} days ${title}`;
    } else if (bgColorClass === "bg-blue-500") {
      // If bg-blue-500, return "Today"
      return "Today";
    }

    return "";
  };
  // Calculate the percentage of before days and after days
  const calculatePercentage = (days, totalDays) => {
    return (days / totalDays) * 100;
  };
  // Get the percentage of before current days and after days
  const getPercentageStyles = () => {
    const totalDays = selectedRange[1].diff(selectedRange[0], "days");
    const daysBeforeCurrent = moment(
      currentDate.format("DD MMM YYYY"),
      "DD MMM YYYY"
    ).diff(
      moment(selectedRange[0].format("DD MMM YYYY"), "DD MMM YYYY"),
      "days"
    );
    const daysRemaining = moment(
      selectedRange[1].format("DD MMM YYYY"),
      "DD MMM YYYY"
    ).diff(moment(currentDate.format("DD MMM YYYY"), "DD MMM YYYY"), "days");

    const percentageBefore = calculatePercentage(daysBeforeCurrent, totalDays);
    const percentageAfter = calculatePercentage(daysRemaining, totalDays);

    return {
      background: `linear-gradient(to right, #3b82f6 ${percentageBefore}%, black ${percentageBefore}%, black ${percentageAfter}%)`,
    };
  };
  return (
    <Tooltip placement="top" title={getRemainingDays()} arrow>
      <div
        className="position-relative d-flex justify-content-center "
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        visible={tooltipVisible}
        onVisibleChange={(visible) => setTooltipVisible(visible)}
      >
        <Space
          direction="vertical"
          size={12}
          className="table_rangePicker position-absolute start-0"
        >
          <RangePicker
            separator=""
            placeholder=""
            value={selectedRange}
            onChange={handleRangeChange}
          />
        </Space>
        {getBackgroundColorClass() === "bg-orange-500" ? (
          <div
            className={`m-0 rounded-pill text-[10px] text-white cursor-pointer h-5 flex items-center justify-center w-36`}
            style={getPercentageStyles()}
          >
            {formattedDateRange || (
              <span className="w-5 h-[2px] bg-white"></span>
            )}
          </div>
        ) : (
          <div
            className={`m-0 rounded-pill text-[10px] text-white cursor-pointer h-5 flex items-center justify-center w-36 ${getBackgroundColorClass()}`}
          >
            {formattedDateRange || (
              <span className="w-5 h-[2px] bg-white"></span>
            )}
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default TimelineCell;
