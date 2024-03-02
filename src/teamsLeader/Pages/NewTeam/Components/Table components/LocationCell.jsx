import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";

const LocationCell = ({ rowId, setRows, rows }) => {
  const [locationValue, setLocationValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event) => {
    setLocationValue(event.target.value);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              location: event.target.value,
            }
          : row
      )
    );
    console.log(rows.find((row) => row.id === rowId));
  };
  const clearCell = (rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              location: "",
            }
          : row
      )
    );
    setLocationValue("");
  };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex align-items-center justify-content-center"
    >
      <Form.Control
        className="py-0 shadow-none workspace_searchInput world_clock transparent_bg h-100 me-1 fw-normal"
        value={rows.find((row) => row.id === rowId)?.location || locationValue}
        onChange={handleInputChange}
        style={{
          width: "150px",
        }}
      />
      <span style={{ width: "14px" }}>
        {rows.find((row) => row.id === rowId)?.location && isHovered && (
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
  );
};

export default LocationCell;
