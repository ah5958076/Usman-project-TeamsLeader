import React, { useState } from "react";
import { Popover, Input } from "antd";
import moment from "moment-timezone";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { IoMdMoon } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
// import "antd/dist/antd.css";

const WorldClockCell = ({ rowId, setRows, rows }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const timezones = moment.tz.names();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleTimezoneSelect = (timezone) => {
    const currentTime = moment.tz(moment(), timezone).format("hh : mm A z");
    // setSearchValue(currentTime);

    const currentHour = moment.tz(moment(), timezone).hour();
    const isDay = currentHour >= 6 && currentHour < 18;
    const backgroundColor = isDay ? "#47ADFF" : "#504F6F";
    const icon = isDay ? (
      <FaCircle
        className="me-1"
        style={{ color: "#F5FF00", fontSize: "16px" }}
      />
    ) : (
      <IoMdMoon className="me-1" style={{ color: "white", fontSize: "19px" }} />
    );
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              worldClock: {
                time: currentTime,
                backgroundColor: backgroundColor,
                icon: icon,
              },
            }
          : row
      )
    );
    setOpen(false);
  };

  const content = (
    <div
      style={{
        maxHeight: "185px",
        overflow: "hidden",
        cursor: "pointer",
        width: "180px",
        textAlign: "center",
      }}
      className="timezome_list"
    >
      {timezones
        .filter((timezone) =>
          timezone.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((timezone) => (
          <div
            key={timezone}
            className="cursor-pointer py-1  px-3 border-bottom "
            onClick={() => handleTimezoneSelect(timezone)}
          >
            {timezone}
          </div>
        ))}
    </div>
  );
  const clearCell = (rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              worldClock: {
                time: "",
                backgroundColor: "",
              },
            }
          : row
      )
    );
    setSearchValue("");
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      <div
        style={{
          backgroundColor: rows.find((row) => row.id === rowId)?.worldClock
            ?.backgroundColor,
          height: "43px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex align-items-center justify-content-center"
      >
        {rows.find((row) => row.id === rowId)?.worldClock?.icon}
        <span>
          <Form.Control
            className={`${
              rows.find((row) => row.id === rowId)?.worldClock?.time
                ? "text-white"
                : ""
            } py-0 shadow-none workspace_searchInput world_clock transparent_bg h-100 me-1 `}
            style={{
              width: "150px",
            }}
            type="text"
            value={
              rows.find((row) => row.id === rowId)?.worldClock?.time ||
              searchValue
            }
            onChange={handleSearchChange}
          />
        </span>

        <span style={{ width: "14px" }}>
          {rows.find((row) => row.id === rowId)?.worldClock?.time &&
            isHovered && (
              <button
                className="px-0 py-0  file_deleteBtn flex  close-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  clearCell(rowId);
                }}
              >
                <RxCross2
                  className=""
                  style={{
                    width: "14px",
                    height: "auto",
                  }}
                />
              </button>
            )}
        </span>
      </div>
    </Popover>
  );
};

export default WorldClockCell;
