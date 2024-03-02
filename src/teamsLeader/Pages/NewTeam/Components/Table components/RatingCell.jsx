import React from "react";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Rating from "react-rating";

const RatingCell = ({ rowId, setRows, rows }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleRating = (rowId, value) => {
    console.log(value);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, rating: value || 0 } : row
      )
    );
  };
  const clearRating = (rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === rowId ? { ...row, rating: 0 } : row))
    );
  };
  return (
    <div
      className="flex align-items-center justify-content-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ marginRight: !isHovered ? "14px" : "0px" }}>
        <Rating
          initialRating={rows.find((row) => row.id === rowId)?.rating}
          emptySymbol={
            <IoIosStar style={{ color: "#c4c4c4", fontSize: "18px" }} />
          }
          fullSymbol={
            <IoIosStar style={{ color: "#fdab3d", fontSize: "18px" }} />
          }
          onChange={(value) => handleRating(rowId, value)}
        />
      </span>
      {isHovered && (
        <button
          className="px-0 py-0 file_deleteBtn flex  close-icon"
          onClick={() => clearRating(rowId)}
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
    </div>
  );
};

export default RatingCell;
